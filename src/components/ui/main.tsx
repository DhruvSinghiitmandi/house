import React, { useEffect, useRef, useState , ChangeEvent, FormEvent } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "./label";
import { Upload } from "lucide-react";
import { Textarea } from "./textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "./button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"

"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
  brand: z.string().min(1),
  feature: z.string().min(1),
})

export function ProfileForm() {
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        brand: "",
      },
    })
   
    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
      // Do something with the form values.
      // ✅ This will be type-safe and validated.
      console.log(values)
    }
  }



function Mainarea() {
    
    
    // const [tone, setTone] = useState<string>("");
    const tone = useRef(""); 
const handleTone = (e: string) => {
    
    console.log(tone.current);
    tone.current = e;
    console.log(tone.current);
    //   setTone((prevTone) => e);
}

const length = useRef(""); 
const handlelength = (e: string) => {
    
    console.log(length.current);
    length.current = e;
    console.log(length.current);
    //   setTone((prevTone) => e);
}

const feature = useRef(""); 
const handlefeature = (e: string) => {
    
    console.log(brand.current);
    feature.current = e;
    console.log(brand.current);
    //   setTone((prevTone) => e);
}
const brand = useRef(""); 
const handlebrand = (e) => {
    
    console.log(brand.current);
    brand.current = e;
    console.log(brand.current);
    //   setTone((prevTone) => e);
}
;

const handleInputChange = (e: FormEvent<HTMLInputElement>)=> {
    // setInputValue(e.target.value);
    console.log(e.target);
};


  return (
    <>
        {console.log("hi")}
      


      <div className="grid grid-cols-4 m-5 gap-5 mt-10">
        <Card className=" col-span-3" x-chunk="dashboard-07-chunk-0">
          <CardHeader>
            <CardTitle>House</CardTitle>
            <CardDescription>
              House Brochure
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              <div className="grid gap-3">
                <Select onValueChange={handleTone}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Choose Tone" />
                  </SelectTrigger>
                  <SelectContent >
                    <SelectItem value="light" >Instagram</SelectItem>
                    <SelectItem value="dark">Linkedin</SelectItem>
                    <SelectItem value="system">Youtube Community</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="name">Prompt</Label>
                <Input
                  id="name"
                  type="text"
                  className="w-full"
                  defaultValue=""
                  placeholder="Enter a prompt"
                  onChange={handleInputChange}
                  onInput={handleInputChange}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="description">
                  Facts you want us to know about your post
                </Label>
                <Textarea
                  id="description"
                  className="min-h-32"
                  placeholder="Enter some facts"
                />
              </div>

              
              <div className="flex justify-end">
                <Button className="bg-blue-600 hover:bg-blue-500">
                  Generate Caption
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
      </div>
    </>
  );
}

export default Mainarea;