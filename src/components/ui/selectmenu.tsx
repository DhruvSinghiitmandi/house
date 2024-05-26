import { forwardRef, useEffect, useState } from 'react';
import { Button } from './button';
import { Sparkles } from 'lucide-react';
import axios from 'axios';
import GenProps from '@/utils/interfaces';

const SelectMenu = forwardRef<GenProps, {}>(({}, ref) => {
    const [selection, setSelection] = useState<string>();
    const [position, setPosition] = useState<Record<string, number>>();

    function onSelectStart() {
        setSelection(undefined);
    }

    function onSelectEnd() {
        const activeSelection = document.getSelection();
        const text = activeSelection?.toString();

        if (!activeSelection || !text) {
            setSelection(undefined);
            return;
        };

        setSelection(text);

        const rect = activeSelection.getRangeAt(0).getBoundingClientRect()

        setPosition({
            x: rect.left + (rect.width / 2) - (120 / 2),
            y: rect.top + window.scrollY - 100,
            width: rect.width,
            height: rect.height,
        });


    }

    useEffect(() => {
        document.addEventListener('selectstart', onSelectStart);
        document.addEventListener('mouseup', onSelectEnd);
        return () => {
            document.removeEventListener('selectstart', onSelectStart);
            document.removeEventListener('mouseup', onSelectEnd);
        }
    }, []);


    function handleshort(_event: any) {
        console.log(selection)

        if (ref != null && 'current' in ref) {
            console.log(ref.current);
            const url = 'http://127.0.0.1:8000/regenerate';
            const params = {
                complete: ref?.current?.content,
                selected: selection,
                choice: "shorter",


            };

            setPosition(undefined);
            axios.post(url, { params })
                .then(response => {
                    setPosition(undefined)
                    console.log("receivevd")

                    const con: string = JSON.parse(JSON.stringify(response)).data.output.toString();
                    ref.current = { flag: ref?.current?.flag, content: con, brand: ref?.current?.brand, feature: ref?.current?.feature, length: ref?.current?.length, tone: ref?.current?.tone }

                    // ref?.current.content = con;

                    console.log(response.data.output);
                    if (window.getSelection()) window.getSelection()?.removeAllRanges();



                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }



    }

    function handlelong(_event: any): void {
        console.log(selection)
        if (ref != null && 'current' in ref) {
            console.log(ref?.current)

            const url = 'http://127.0.0.1:8000/regenerate';
            const params = {
                complete: ref?.current?.content,
                selected: selection,
                choice: "longer",


            };

            setPosition(undefined);
            axios.post(url, { params })
                .then(response => {
                    setPosition(undefined)
                    console.log("receivevd")

                    const con: string = JSON.parse(JSON.stringify(response)).data.output.toString();
                    ref.current = { flag: 1, content: con, brand: ref?.current?.brand, feature: ref?.current?.feature, length: ref?.current?.length, tone: ref?.current?.tone }
                    console.log(response.data.output);
                    if (window.getSelection()) window.getSelection()?.removeAllRanges();

                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }

    }

    return (
        <div role="dialog" aria-labelledby="share" aria-haspopup="dialog">
            {selection && position && (
                <p
                    className="
            absolute -top-2 left-0 w-[120px] h-[100px] bg-slate-300 text-black rounded-lg bg-opacity-60
            after:absolute after:top-full after:left-1/2 after:-translate-x-2 after:h-0 after:w-0 after:border-x-[6px] after:border-x-transparent after:border-b-[8px] after:border-b-slate-300 after:rotate-180
            flex flex-row

            
            "
                    style={{
                        transform: `translate3d(${position.x}px, ${position.y}px, 0)`
                    }}
                >
                    <div className='p-1 ' > <Sparkles color="#f9f06b" />    </div>
                    <div className='flex flex-col gap-6'>
                        <Button type='button' onClick={handleshort} className="text-s text-black bg-opacity hover:text-white hover:bg-opacity"><span id="share"  >Shorter</span>
                        </Button>
                        <Button type='button' onClick={handlelong} className="text-s text-black  bg-opacity hover:text-white hover:bg-opacity "><span id="share">Longer</span>
                        </Button>
                    </div>

                </p>
            )}
        </div>
    );
});

export default SelectMenu;