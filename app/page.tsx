'use client'
import { useMutation, useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Button } from "@/components/ui/button";

const Page = () => {
  const projects = useQuery(api.projects.get);
  const createProject=useMutation(api.projects.create);
  
  return (
    <div>
      <Button onClick={()=>{
        createProject({
          name:"New Project"
        })
      }}>
        Add new
      </Button>
      {projects?.map((project) => (
        <div key={project._id} className="text-white">
          {project._id}
          <p>{project.name}</p>
        
        </div>
      ))}
    </div>
  )
}

export default Page