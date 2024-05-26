import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


import Selectmenu from "./selectmenu";
import { Button } from "./button";
import axios from "axios";

import GenProps from "@/utils/interfaces";


import {  forwardRef} from "react";


const Gen = forwardRef<GenProps, {} >(({} , ref) => {
  
  if(ref != null && 'current' in ref)console.log(ref?.current?.brand); // Access the current value of the ref
 

  async function Pushdb() {
    const url = 'http://127.0.0.1:8000/insert';
    
    if(ref != null && 'current' in ref){
      const params = {
        brand:  ref?.current?.brand ,
        feature:  ref?.current?.feature ,
        length:  ref?.current?.length ,
        tone:  ref?.current?.tone ,
        out:  ref?.current?.content 
      };
          // const params { brand = "", feature = "", length = 0, tone = "", content: out = "" } = ref?.current ?? {};

      await axios.post(url, { params })
      .then( () => {
        console.log("pushed")
        //   const con:string = JSON.parse(JSON.stringify(response)).data.output.toString();
        //   ref.current = { flag: 1, content: con , brand : data.brand , feature: data.feature , length: data.length , tone: data.tone }
        //   console.log(response.data.output);
      })
      .catch(error => {
        console.error('Error:', error);
      });
    }
    
    

  }


  if (ref != null  && 'current' in ref && ref?.current?.flag) {



    return (


      <div className="mt-6">
        <Selectmenu ref={ref}></Selectmenu>
        <Card >
          <CardHeader>
            <CardTitle>Property Brochure</CardTitle>
            <CardDescription >

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












