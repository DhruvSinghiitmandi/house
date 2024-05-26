import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Sparkles } from 'lucide-react';

import Selectmenu from "./selectmenu";
import { Button } from "./button";
import axios from "axios";
interface GenProps {
  flag: any;
  content: any;
  feature: any;
  length: any;
  brand: any;
  tone: any;
}


import { FC, Ref, forwardRef, useEffect, useRef, useState } from "react";

interface ChildProp { }

import SelectMenu from "./selectmenu";
const Gen = forwardRef<GenProps, {} >((props , ref) => {
  console.log(ref?.current?.brand); // Access the current value of the ref
 

  async function Pushdb() {
    const url = 'http://127.0.0.1:8000/insert';
    const params = {
      brand:  ref?.current?.brand ,
      feature:  ref?.current.feature ,
      length:  ref?.current.length ,
      tone:  ref?.current.tone ,
      out:  ref?.current.content 
    };

    await axios.post(url, { params })
      .then(response => {
        console.log("pushed")
        //   const con:string = JSON.parse(JSON.stringify(response)).data.output.toString();
        //   ref.current = { flag: 1, content: con , brand : data.brand , feature: data.feature , length: data.length , tone: data.tone }
        //   console.log(response.data.output);
      })
      .catch(error => {
        console.error('Error:', error);
      });

  }

  function handleselect() {
    console.log("selected")
  }


  if (ref.current.flag) {

    const [selection, setSelection] = useState<any>();
    const [position, setPosition] = useState<Record<string, number>>();

    useEffect(() => {
      document.addEventListener('selectionchange', () => {
        const activeSelection = document.getSelection();
        const text = activeSelection?.toString();

        if (!activeSelection || !text) {
          setSelection(undefined);
          return;
        };

        setSelection(text);

        const rect = activeSelection.getRangeAt(0).getBoundingClientRect()

        setPosition({
          x: rect.left + (rect.width / 2) - (80 / 2),
          y: rect.top + window.scrollY - 30,
          width: rect.width,
          height: rect.height,
        })
      });
    }, []);


    return (


      <div className="mt-6">
        <Selectmenu ref={ref}></Selectmenu>
        <Card onSelect={handleselect} onSelectCapture={handleselect}>
          <CardHeader>
            <CardTitle>Image Title</CardTitle>
            <CardDescription onSelect={handleselect} onSelectCapture={handleselect}>

              {ref?.current?.content}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-5 justify-end h-full">

              <div className="flex justify-end">
                <Button className="bg-blue-600 hover:bg-blue-500" onClick={Pushdb} type="button">
                  Insert in DB
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>



    )
  }
  else {
    return (<div className="flex justify-center  ">
      <Button className=" bg-blue-600 hover:bg-blue-500 " type="submit">Generate</Button>
    </div>)
  }


});



;
export default Gen












