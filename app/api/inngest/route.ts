import {serve} from "inngest/next";
import {inngest} from "@/inngest/client";
import { demoGenerate} from "@/inngest/functions";


//create an api that servers zero function


export const {GET,POST,PUT} =serve({
    client:inngest,
    functions:[
        demoGenerate,
    ]
})