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
  const [interest, setInterest] = useState("");
  const [experience, setExperience] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [projects, setProjects] = useState<any[]>([]);

  async function onSubmit() {
    setIsLoading(true);
    let r = await generateProjects(interest, experience);
    setProjects(r);
    setIsLoading(false);
  }

  return (
    <main>
      <div className="mb-4 flex items-center gap-2">
        <Input
          type="text"
          placeholder="Specifies Your interest"
          value={interest}
          onChange={(e) => setInterest(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Specifies Your experience technology"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
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
                  <div className="mb-2 rounded border border-border bg-card text-card-foreground shadow-sm">
                    <ul className="ml-4 list-disc p-2 text-sm">
                      {project.objectives.map(
                        (objective: string, index: number) => (
                          <li key={index}>{objective}</li>
                        ),
                      )}
                    </ul>
                  </div>
                  <ol className="ml-4 list-decimal">
                    {project.features.map((feature: string, index: number) => (
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
