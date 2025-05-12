import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertAboutSchema } from "@shared/schema";
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
import { Save } from "lucide-react";

type AboutForm = {
  title: string;
  description: string;
  experienceYears: string;
};

export default function ManageAbout() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<AboutForm>({
    resolver: zodResolver(insertAboutSchema),
    defaultValues: {
      title: "",
      description: "",
      experienceYears: "",
    },
  });

  const { data: about, isLoading } = useQuery({
    queryKey: ["/api/admin/about"],
    onSuccess: (data) => {
      if (data) {
        form.reset(data);
      }
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (data: AboutForm) => {
      await apiRequest("PATCH", "/api/admin/about", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/about"] });
      toast({
        title: "Success",
        description: "About section updated successfully",
      });
    },
  });

  if (isLoading) {
    return <p>Loading about information...</p>;
  }

  return (
    <Card className="p-6">
      <h3 className="text-lg font-medium mb-4">Update About Section</h3>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => updateMutation.mutate(data))}
          className="space-y-4"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="About section title" {...field} />
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
                    placeholder="About description"
                    className="min-h-[200px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="experienceYears"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Years of Experience</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 2" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="flex items-center gap-2"
            disabled={updateMutation.isPending}
          >
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </form>
      </Form>
    </Card>
  );
}
