import { UseFormReturn } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./form";
import { Input } from "./input";



const inputfield = (placeholder:string,name:string,

    form: UseFormReturn<{
    length: string;
    tone: string;
    brand: string;
    feature: string;
}, any, undefined>) => {
    return(
        <FormField
                        control={form.control}
                        name={name}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Brand Positioning</FormLabel>
                                <FormControl>
                                    <Input placeholder= {placeholder}{...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />



    )
}
