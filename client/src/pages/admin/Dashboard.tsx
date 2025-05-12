import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import ManageSkills from "./components/ManageSkills";
import ManageProjects from "./components/ManageProjects";
import ManageAbout from "./components/ManageAbout";
import AdminNavbar from "./components/AdminNavbar";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("skills");

  return (
    <div className="min-h-screen bg-background">
      <AdminNavbar />
      <main className="container mx-auto px-4 py-8">
        <Card className="p-6">
          <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-8">
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="about">About</TabsTrigger>
            </TabsList>

            <TabsContent value="skills">
              <ManageSkills />
            </TabsContent>

            <TabsContent value="projects">
              <ManageProjects />
            </TabsContent>

            <TabsContent value="about">
              <ManageAbout />
            </TabsContent>
          </Tabs>
        </Card>
      </main>
    </div>
  );
}
