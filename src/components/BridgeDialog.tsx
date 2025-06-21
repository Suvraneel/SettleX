"use client";
import {FormEvent, useEffect, useState} from "react";
import {Bounce, toast} from 'react-toastify';
import {ComboBox} from "@components/ComboBox";
import {chains} from "@lib/chains";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@components/ui/accordion";
import {Input} from "@components/ui/input";
import {Button} from "@components/ui/button";
import {ArrowLongDown, CreditCard} from "@mynaui/icons-react";
import {AnimatePresence, motion} from "framer-motion";
import {tokens} from "@lib/tokens";
import {NumericFormat} from "react-number-format";
import {MarketDataResponse} from "@/types/uniblock-response";
import {DialogBody} from "next/dist/client/components/react-dev-overlay/ui/components/dialog";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

export default function BridgeDialog() {
    const [sourceChain, setSourceChain] = useState("");
    const [destinationChain, setDestinationChain] = useState("");
    const [token, setToken] = useState("");
    const [amount, setAmount] = useState("");
    const [receivingAddressInputShow, setReceivingAddressInputShow] = useState(false);
    const [marketData, setMarketData] = useState<MarketDataResponse | null>(null);
    const [unableToFetch, setUnableToFetch] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/uniblock`, {
                    method: 'GET',
                    headers: {
                        accept: 'application/json'
                    }
                });
                const data = await response.json();
                setMarketData(data);
                console.log("Fetched market data:", data);
            } catch (error) {
                console.error("Error fetching market data:", error);
                setUnableToFetch(true);
            }
        };

        fetchData();
    }, []);

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
            theme: "dark",
            transition: Bounce,
        });
    };
    return (
        <Dialog>
            <DialogTrigger>Bridge</DialogTrigger>
            <DialogContent
                className="fixed top-1/2 max-h-screen overflow-x-hidden overflow-y-auto w-full md:max-w-lg bg-card text-card-foreground py-6 px-10 rounded-3xl hover:shadow-lg transition">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-light">Bridge</DialogTitle>
                    <DialogDescription className="text-muted-foreground text-base font-light">
                        Your bridge will be optimized for the lowest, and most efficient settlement.
                    </DialogDescription>
                </DialogHeader>
                <DialogBody>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <div
                                className="border border-theme-surface-border px-4 flex items-center justify-between rounded-xl border-none">
                                <div className="text-base font-light">From</div>
                                <ComboBox label={"Select Chain"} options={chains} selection={sourceChain}
                                          setSelection={setSourceChain}/>
                            </div>
                            <div className={"py-3 px-4 flex items-center justify-between"}>
                                <div className="text-base font-light">Token</div>
                                <div className={"flex justify-end gap-2"}>
                                    <ArrowLongDown height={40}/>
                                    <ComboBox label={"Select Token"} options={tokens} selection={token}
                                              setSelection={setToken} className={"w-[150px]"}/>
                                </div>
                            </div>
                            <div
                                className="border border-theme-surface-border px-4 flex items-center justify-between rounded-xl border-none">
                                <div className="text-base font-light">To</div>
                                <ComboBox label={"Select Chain"} options={chains} selection={destinationChain}
                                          setSelection={setDestinationChain}/>
                            </div>
                            <div
                                className="py-3 px-4 space-y-3 rounded-xl">
                                <div className="text-base font-light">Amount</div>
                                <div className="flex flex-col gap-2">
                                    <div className="flex justify-between gap-2">
                                        <NumericFormat
                                            disabled={!token}
                                            allowNegative={false}
                                            thousandSeparator=","
                                            customInput={Input}
                                            inputMode="numeric"
                                            displayType="input"
                                            className="w-full text-base font-light outline-none"
                                            placeholder="0.00"
                                            onChange={(e) => setAmount(e.target.value)}
                                        />
                                        <Button type="button" disabled={!token}>
                                            Max
                                        </Button>
                                    </div>
                                    <div className="text-base font-light text-muted-foreground flex justify-between">
                                        {!marketData ? (!unableToFetch ? "Loading market data..." : "Unable to fetch market data") :
                                            (!token ? "Select a token to see the estimated value" :
                                                (amount ? new Intl.NumberFormat('en-US', {
                                                        style: 'currency',
                                                        currency: 'USD'
                                                    }).format(parseFloat(amount.replaceAll(',', '')) * marketData.data[token.toUpperCase()].usd)
                                                    : "0.00"))}
                                    </div>
                                </div>
                            </div>
                            <div
                                className="border border-theme-surface-border px-4 space-y-1 rounded-xl border-none text-sm">
                                <div className="flex w-full justify-between disabled:cursor-not-allowed">
                                    <Accordion type="single" collapsible className={"w-full"}>
                                        <AccordionItem value="item-1">
                                            <AccordionTrigger>
                                                <div
                                                    className="text-sm font-normal underline decoration-dashed group-hover:decoration-solid underline-offset-4">Estimates
                                                </div>
                                            </AccordionTrigger>
                                            <AccordionContent
                                                className={"flex flex-row justify-between"}>
                                                <div
                                                    className="text-sm font-normal underline decoration-dashed underline-offset-4">
                                                    Estimated Fee
                                                </div>
                                                <div>{" "}-{" "}</div>
                                            </AccordionContent>
                                            <AccordionContent className={"flex flex-row justify-between"}>
                                                <div
                                                    className="text-sm font-normal underline decoration-dashed underline-offset-4">
                                                    Avg Settlement Time
                                                </div>
                                                <div>5-10 min</div>
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                </div>
                            </div>
                        </div>
                        <AnimatePresence>
                            {receivingAddressInputShow && (
                                <motion.div
                                    initial={{height: 0, opacity: 0}}
                                    animate={{height: "auto", opacity: 1}}
                                    exit={{height: 0, opacity: 0}}
                                    transition={{duration: 0.1}}
                                    className="py-3 px-4 space-y-3 rounded-xl group overflow-hidden"
                                >
                                    <div className="text-base font-light">Receiving Address</div>
                                    <div className="flex flex-row gap-2 relative">
                                        <Input
                                            className="w-full text-base font-light sm:w-full"
                                            placeholder="Enter Ethereum Wallet Address"
                                            type="text"
                                        />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                        <div className="flex gap-2 px-4 rounded-xl">
                            <Button
                                className="w-full"
                                disabled type={"submit"}>Create Intent
                            </Button>
                            <Button
                                type="button"
                                onClick={() => setReceivingAddressInputShow(!receivingAddressInputShow)}
                                className="inline-flex items-center justify-center gap-2 whitespace-nowrap
                                disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0
                                px-5 py-2">
                                <CreditCard/>
                            </Button>
                        </div>
                    </form>
                </DialogBody>
            </DialogContent>
        </Dialog>
    );
}

