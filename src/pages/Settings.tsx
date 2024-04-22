import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from "react-hook-form";

import { PageHeader, PageHeaderHeading } from "@/components/page-header";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
})

export default function Settings() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
        },
    })

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log(values)
    }

    return (
        <>
            <PageHeader>
                <PageHeaderHeading>Settings</PageHeaderHeading>
            </PageHeader>
            <div className="grid gap-6 md:grid-cols-2">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <Card>
                            <CardHeader>
                                <CardTitle>Add your GeoAPIfy Key</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <FormField
                                    control={form.control}
                                    name="username"
                                    render={({ field }) => (
                                        <FormItem className="space-y-0 grid gap-2 md:gap-4 md:grid-cols-4">
                                            <div className="md:py-1">
                                                <FormLabel >Secret Key</FormLabel>
                                            </div>
                                            <div className="md:col-span-3 space-y-2">
                                                <FormControl>
                                                    <Input placeholder="abcd-123-abcd..." {...field} />
                                                </FormControl>
                                                <FormDescription>
                                                    Insert here your key to access to the GeoApify functionalities
                                                </FormDescription>
                                                <FormMessage />
                                            </div>
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                            <CardFooter className="justify-end">
                                <Button type="submit">Updae</Button>
                            </CardFooter>
                        </Card>
                    </form>
                </Form>
            </div>
        </>
    )
}