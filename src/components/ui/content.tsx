import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";

  import { Button } from "./button";

  interface GenProps {
    flag: any;
    content: any
  }
  const Gen: React.FC<GenProps> = ({ flag , content}) => {



    if(flag){return(
        <div className="mt-6">
            <Card >
          <CardHeader>
            <CardTitle>Image Title</CardTitle>
            <CardDescription>
          
              {content}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-5 justify-end h-full">
              
              <div className="flex justify-end">
                <Button className="bg-blue-600 hover:bg-blue-500">
                  Regenerate
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

            </div>          
                 
        
        
    )}
    else{   
        return(<div className="flex justify-center  ">
                    <Button  className=" bg-blue-600 hover:bg-blue-500 ">Generate</Button>
                </div>)
    }
}
export default Gen

