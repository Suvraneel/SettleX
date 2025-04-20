"use client";
import {FormEvent, useState} from "react";
import {Bounce, toast} from 'react-toastify';
import {useTheme} from "next-themes";
import {ComboBox} from "@components/ComboBox";
import {chains} from "@lib/chains";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@components/ui/accordion";
import {Input} from "@components/ui/input";
import {Button} from "@components/ui/button";
import {ArrowLongDown, CreditCard} from "@mynaui/icons-react";
import {motion, AnimatePresence} from "framer-motion";
import {tokens} from "@lib/tokens";
import {NumericFormat} from "react-number-format";

export default function Waitlist() {
    const {resolvedTheme} = useTheme();
    const [receivingAddressInputShow, setReceivingAddressInputShow] = useState(false);
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Add your form submission logic here
        toast.success('Intent created successfully! 📧 ', {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: resolvedTheme || "dark",
            transition: Bounce,
        });
    };
    return (
        <div className="w-full h-full p-5 transition-all">
            <div
                className="w-full h-full min-h-screen flex flex-col px-10 sm:px-20 pt-20 justify-start gap-5 sm:gap-12 items-center dark:bg-dot-white/[0.2] bg-dot-black/[0.2]">
                <form onSubmit={handleSubmit}
                      className="bg-background text-foreground border rounded-xl flex w-full flex-col gap-3 p-3 sm:w-[30rem] md:p-6">
                    <div className="flex flex-col gap-2 pb-2 px-4">
                        <div className="flex items-center justify-between">
                            <div className="text-[1.25rem] leading-[1.5] font-normal ">Bridge
                            </div>
                        </div>
                        <div className="text-[0.875rem] leading-[1.428] font-normal ">Your
                            bridge will be optimized for the lowest, and most efficient settlement.
                        </div>
                    </div>
                    <div>
                        <div
                            className="border border-theme-surface-border px-4 flex items-center justify-between rounded-xl border-none">
                            <div className="text-[0.875rem] leading-[1.428] font-normal ">From</div>
                            <ComboBox label={"Select Chain"} options={chains}/>
                        </div>
                        <div className={"py-3 px-4 flex items-center justify-between"}>
                            <div className="text-[0.875rem] leading-[1.428] font-normal ">Token</div>
                            <div className={"flex justify-end gap-2"}>
                                <ArrowLongDown height={40}/>
                                <ComboBox label={"Select Token"} options={tokens} className={"w-[150px]"}/>
                            </div>
                        </div>
                        <div
                            className="border border-theme-surface-border px-4 flex items-center justify-between rounded-xl border-none">
                            <div className="text-[0.875rem] leading-[1.428] font-normal ">To</div>
                            <ComboBox label={"Select Chain"} options={chains}/>
                        </div>
                        <div
                            className="py-3 px-4 space-y-3 rounded-xl">
                            <div className="text-[0.875rem] leading-[1.428] font-normal">Amount</div>
                            <div className="flex flex-col gap-2">
                                <div className="flex justify-between gap-2">
                                    <NumericFormat
                                        allowNegative thousandSeparator="," customInput={Input} displayType="input"
                                        className="bg-transparent outline-none w-full text-[1.25rem] leading-[1.5] font-normal"
                                        placeholder="0.00" inputMode="numeric"
                                    />
                                    <Button type="button"
                                            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md
                                    text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring
                                    disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0
                                    border border-input bg-background shadow-sm hover:bg-accent dark:text-white h-9 px-4 py-2">
                                        Max
                                    </Button>
                                </div>
                                <div className="text-[0.875rem] leading-[1.428] font-normal flex justify-between">
                                    <div>$0.00</div>
                                    <div></div>
                                </div>
                            </div>
                        </div>
                        <div
                            className="border border-theme-surface-border px-4 space-y-2 rounded-xl border-none">
                            <button type="button" className="flex w-full justify-between disabled:cursor-not-allowed">
                                <Accordion type="single" collapsible className={"w-full"}>
                                    <AccordionItem value="item-1">
                                        <AccordionTrigger>
                                            <div
                                                className="text-[0.875rem] leading-[1.428] font-normal  underline decoration-dashed group-hover:decoration-solid underline-offset-4">Estimates
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent className={"flex flex-row justify-between"}>
                                            <div
                                                className="text-[0.875rem] leading-[1.428] font-normal  underline decoration-dashed underline-offset-4">Avg
                                                Settlement Time
                                            </div>
                                            <div>5-30 min</div>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </button>
                        </div>
                    </div>
                    <AnimatePresence>
                        {receivingAddressInputShow && (
                            <motion.div
                                initial={{height: 0, opacity: 0}}
                                animate={{height: "auto", opacity: 1}}
                                exit={{height: 0, opacity: 0}}
                                transition={{duration: 0.3}}
                                className="px-4 py-1 rounded-xl space-y-3 group overflow-hidden"
                            >
                                <div className="text-[0.875rem] leading-[1.428] font-normal">Receiving Address</div>
                                <div className="flex flex-col gap-2">
                                    <Input
                                        className="bg-transparent outline-none w-full text-[1.25rem] leading-[1.5] font-normal"
                                        placeholder="Enter Ethereum Wallet Address"
                                        type="text"
                                    />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <div className="flex gap-2 px-4 rounded-xl">
                        <Button
                            className="w-full inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md
                                text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring
                                disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0
                                border border-input bg-background shadow-sm hover:bg-accent h-9 px-4 py-2 dark:text-white disabled:dark:text-neutral-300"
                            disabled type={"submit"}>Create Intent
                        </Button>
                        <Button onClick={() => setReceivingAddressInputShow(!receivingAddressInputShow)}
                                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md disabled:text-neutral-500
                                text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring
                                disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 dark:text-white
                                border border-input bg-background shadow-sm hover:bg-accent h-9 px-4 py-2">
                            <CreditCard/>
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
