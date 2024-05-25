"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { features } from "process"
import { useRef } from "react";
import { Content } from "@radix-ui/react-select";
import Gen from "./content";
import { Flag } from "lucide-react";

const FormSchema = z.object({
  tone: z.string().min(1,{
    message: "Select The tone!"
  }),
  brand: z.string().min(1,{
    message: "Fill Brand Positioning"
  }),
  feature: z.string().min(1,{
    message: "What are the Features of the property"
  }),
  length: z.string().min(1,{
    message: "Select The length of the brochure"
  })
})
interface GenProps {
    flag: any,
    content: any ;
  }
export function InputForm() {
    const ref = useRef<GenProps | null>({flag: 0,content: ""})


  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
   
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("HI");
    ref.current = { flag: 1, content: JSON.stringify(data)  }
    
  }

  
  return (
    <div className="container mx-auto p-4">
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                    <FormField
                        control={form.control}
                        name="brand"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Brand Positioning</FormLabel>
                                <FormControl>
                                    <Input placeholder="Brand Positioning" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="feature"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Features</FormLabel>
                                <FormControl>
                                    <Input placeholder="Features" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="grid grid-cols-2 gap-6">
                    <FormField
                        control={form.control}
                        name="tone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Tone</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Tone" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="Casual">Casual</SelectItem>
                                        <SelectItem value="Formal">Formal</SelectItem>
                                        <SelectItem value="Grandiose">Grandiose</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="length"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Length</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Length" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="Short">Short</SelectItem>
                                        <SelectItem value="Medium">Medium</SelectItem>
                                        <SelectItem value="Long">Long</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <Gen content={ref.current?.content} flag={ref.current?.flag}></Gen>
                
            </form>
        </Form>
    </div>
);

    
}
