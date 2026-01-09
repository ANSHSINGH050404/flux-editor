import { AuthConfig } from "convex/server";

export default {
    providers:[
        {
            domain:process.env.
            CLERK_JWT_ISSUE_DOMAIN!,
            applicationID:"convex",
        },
    ],

} satisfies AuthConfig;