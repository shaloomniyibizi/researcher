"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { generateProjects } from "@/lib/actions/actions.actions";
import { Loader2 } from "lucide-react";
import { useState } from "react";

function AssistantPage() {
  const [preferences, setPreferences] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [projects, setProjects] = useState<any[]>([]);

  async function onSubmit() {
    setIsLoading(true);
    let r = await generateProjects(preferences);
    setProjects(r);
    setIsLoading(false);
  }

  return (
    <main>
      <div className="mb-4 flex items-center gap-2">
        <Input
          type="text"
          placeholder="Specifies Your interest"
          value={preferences}
          onChange={(e) => setPreferences(e.target.value)}
        />
        <Button onClick={() => onSubmit()} type="submit">
          Generate Idea
        </Button>
      </div>
      {isLoading && <Loader2 className="animate-spin" />}
      <div className="grid gap-4 md:grid-cols-3">
        {projects.length > 0 &&
          projects.map((project, index) => (
            <Card key={index} className="flex flex-1 flex-col">
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col">
                <div className="mb-2 flex flex-1 flex-col">
                  <div className="">Problem Statements: </div>
                  <p>{project.problemStatement}</p>
                  <div className="">Possible solution: </div>
                  <p>{project.solution}</p>
                  <div className="">Objectives: </div>

                  <p>{project.objectives}</p>
                  <ol className="ml-4 list-decimal">
                    {project.features
                      .split(",")
                      .map((feature: string, index: number) => (
                        <li key={index}>{feature}</li>
                      ))}
                  </ol>
                </div>
                <Button onClick={() => alert("You clicked the button")}>
                  Save
                </Button>
              </CardContent>
            </Card>
          ))}
      </div>
    </main>
  );
}

export default AssistantPage;
