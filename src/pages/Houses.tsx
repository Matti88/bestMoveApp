import { Button } from "@/components/ui/shadcn/button";
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/shadcn/card";
import { SVGProps } from "react";
import TabsComponent from '@/components/ui/TabsComponent'
import houselistingStore from '@/store/houselistingStore';
import FileUploader from '@/components/ui/FileUploader';



const Houses : React.FC = () => {
  const exampleHouseListing = houselistingStore((state) => state.exampleHouseListing);
  const exportToSpreadsheet = houselistingStore((state) => state.exportToSpreadsheet);

  return (
    <>
      <div className="container mx-50 ">  <div className="items-center mt-10 gap-10">
        <div className="flex flex-col items-center mt-10 gap-10">

          <Card className="w-full mx-auto px-10">

            <CardHeader>
              <CardTitle>Upload a File</CardTitle>
            </CardHeader>

            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid grid-rows-2 grid-flow-col gap-4">
                  <p>Upload here the dataset of the houses in an excel file. Make sure to follow the proper formatting. In case you have any doubt download the example file from this section</p>
                  
                  <Button className="h-8 gap-1" size="sm" variant="outline">
                    <FileIcon className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap" onClick={() => exportToSpreadsheet(exampleHouseListing, "TemplateHouses")}> Template File for Houses</span>
                  </Button>
                  
                </div>
                <FileUploader />
              </div>
            </CardContent>

          </Card>

          <div className="w-full">

            <TabsComponent></TabsComponent>

          </div>
        </div>

      </div></div>
    </>
  );
}

function FileIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  );
}

export default Houses;