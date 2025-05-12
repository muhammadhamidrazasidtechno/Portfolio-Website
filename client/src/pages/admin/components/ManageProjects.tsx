import { useState, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trash2, Plus } from "lucide-react";
import { insertProjectSchema, type Project } from "@shared/schema";

// Function to upload images and get URLs
const uploadImages = async (images: File[]): Promise<string[]> => {
  if (images.length === 0) return [];

  const formData = new FormData();
  images.forEach((image, index) => {
    formData.append(`images[${index}]`, image);
  });

  const res = await fetch("/api/admin/upload-images", {
    method: "POST",
    body: formData,
    credentials: "include",
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("Upload response:", text); // Log the raw response
    throw new Error(text || "Failed to upload images");
  }

  const contentType = res.headers.get("content-type");
  if (!contentType || !contentType.includes("application/json")) {
    throw new Error("Invalid response format: Expected JSON");
  }

  const result = await res.json();
  if (!Array.isArray(result.imageUrls)) {
    throw new Error("Invalid response: imageUrls is not an array");
  }
  return result.imageUrls;
};

type ProjectForm = z.infer<typeof insertProjectSchema>;

export default function ManageProjects() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [images, setImages] = useState<File[]>([]);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<ProjectForm>({
    resolver: zodResolver(insertProjectSchema),
    defaultValues: {
      title: "",
      description: "",
      image: [],
      technologies: [],
    },
  });

  const { data: projects = [], isLoading } = useQuery<Project[]>({
    queryKey: ["/api/admin/projects"],
  });

  const createMutation = useMutation({
    mutationFn: async (data: ProjectForm) => {
      const imageUrls = await uploadImages(images);
      const projectData = { ...data, image: imageUrls };
      return apiRequest("POST", "/api/admin/projects", projectData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/projects"] });
      form.reset();
      setImages([]);
      if (imageInputRef.current) imageInputRef.current.value = "";
      toast({ title: "Success", description: "Project added successfully" });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to add project",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: ProjectForm }) => {
      const imageUrls = await uploadImages(images);
      const projectData = {
        ...data,
        image: imageUrls.length > 0 ? imageUrls : data.image,
      };
      return apiRequest("PATCH", `/api/admin/projects/${id}`, projectData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/projects"] });
      setEditingId(null);
      form.reset();
      setImages([]);
      if (imageInputRef.current) imageInputRef.current.value = "";
      toast({ title: "Success", description: "Project updated successfully" });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update project",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/admin/projects/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/projects"] });
      toast({ title: "Success", description: "Project deleted successfully" });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete project",
        variant: "destructive",
      });
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files).filter((file) => {
        if (file.size > 5 * 1024 * 1024) {
          toast({
            title: "Error",
            description: `${file.name} is too large. Max size is 5MB.`,
            variant: "destructive",
          });
          return false;
        }
        if (!file.type.startsWith("image/")) {
          toast({
            title: "Error",
            description: `${file.name} is not an image.`,
            variant: "destructive",
          });
          return false;
        }
        return true;
      });
      setImages((prev) => [...prev, ...newImages]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleReset = () => {
    form.reset();
    setEditingId(null);
    setImages([]);
    if (imageInputRef.current) imageInputRef.current.value = "";
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">
          {editingId ? "Edit Project" : "Add New Project"}
        </h3>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) =>
              editingId
                ? updateMutation.mutate({ id: editingId, data })
                : createMutation.mutate(data)
            )}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Project title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Project description"
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <FormLabel>Upload Images</FormLabel>
              <input
                ref={imageInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="block w-full mt-1 border rounded px-3 py-2 text-sm file:mr-4 file:py-1 file:px-2 file:border-0 file:text-sm file:bg-primary file:text-white"
              />
              {images.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {images.map((file, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Preview ${index}`}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <FormField
              control={form.control}
              name="technologies"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Technologies</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. React, TypeScript, Tailwind"
                      value={field.value?.join(", ") ?? ""}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value
                            .split(",")
                            .map((tech) => tech.trim())
                            .filter((tech) => tech.length > 0)
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-2">
              <Button
                type="submit"
                disabled={createMutation.isPending || updateMutation.isPending}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                {editingId ? "Update Project" : "Add Project"}
              </Button>
              {editingId && (
                <Button type="button" variant="outline" onClick={handleReset}>
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </Form>
      </Card>
      <div className="grid md:grid-cols-2 gap-4">
        {isLoading ? (
          <p>Loading projects...</p>
        ) : projects.length === 0 ? (
          <p>No projects found.</p>
        ) : (
          projects.map((project) => (
            <Card key={project.id} className="p-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{project.title}</h4>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setEditingId(project.id);
                        form.reset({
                          title: project.title,
                          description: project.description,
                          image: project.image,
                          technologies: project.technologies,
                        });
                        setImages([]);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteMutation.mutate(project.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-2 py-1 bg-primary/10 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                {project.image?.length > 0 && (
                  <div className="grid grid-cols-3 gap-2">
                    {project.image.map((img, index) => (
                      <img
                        key={index}
                        src={img}
                        alt={`Project image ${index + 1}`}
                        className="w-full h-24 object-cover rounded"
                      />
                    ))}
                  </div>
                )}
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}