import { Button } from "@/components/ui/button"
//import { Input } from "@/components/ui/input"
//import { DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem, DropdownMenuContent, DropdownMenu, DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu"
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { SVGProps, useEffect, useState } from "react"
import { JSX } from "react/jsx-runtime"
import { PageHeader, PageHeaderHeading } from "@/components/page-header";
//import { getAllHouses, House, addHouse, ReadHouse } from '../database';
import { TableRow2 } from "@/components/ui/tablerow";
import { Link } from 'react-router-dom';
import houselistingStore from '@/store/houselistingStore';

import FileUploader  from '@/components/ui/fileUploader';


import { TabsTrigger, TabsList, TabsContent, Tabs } from "@/components/ui/tabs"

export default function Houses() {

  //const [houses, setHouses] = useState([]); 
  const houses = houselistingStore((state) => state.houseListings);
  
  return (
    <>
    <div className="flex flex-col items-center mt-10 gap-10">
      <Card className="w-full mx-auto   px-10">
        <CardHeader>
          <CardTitle>Upload a File</CardTitle>
        </CardHeader>
        <CardContent>
          <FileUploader />
        </CardContent>
      </Card>

      <div className="w-full">
        <Tabs defaultValue="all">
          <div className="flex items-center gap-20">
            <div className="ml-auto flex items-center gap-20">
              <Button className="h-8 gap-1" size="sm" variant="outline">
                <FileIcon className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Export</span>
              </Button>
              <Link to="/database">
                <Button className="h-8 gap-1" size="sm">
                  <PlusCircleIcon className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add Product</span>
                </Button>
              </Link>
            </div>
          </div>
          <TabsContent value="all">
            <Card x-chunk="dashboard-06-chunk-0">
              <CardHeader>
                <CardTitle>Houses</CardTitle>
                <CardDescription>Manage your houses and view their details.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="hidden w-[100px] sm:table-cell">
                        <span className="sr-only">Image</span>
                      </TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Area</TableHead>
                      <TableHead className="hidden md:table-cell">Address</TableHead>
                      {/* <TableHead>Date</TableHead> */}
                      {/* <TableHead>
                        <span className="sr-only">Actions</span>
                      </TableHead> */}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {houses.map((house) => (
                      <TableRow key={house.id}>
                        <td className="hidden sm:table-cell">
                          <img src={house.image} alt={house.title} className="w-10 h-10 object-cover" />
                        </td>
                        <td>{house.title}</td>
                        <td>{house.price}</td>
                        <td>{house.sqm}</td>
                        <td className="hidden md:table-cell">{house.address}</td>
                        {/* <td>{house.date}</td> */}
                        {/* <td>
                          <button className="text-blue-500 hover:underline">Edit</button>
                        </td> */}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter>
                <div className="text-xs text-muted-foreground">
                  Showing <strong>1-10</strong> of <strong>{houses.length}</strong> houses
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
    </>
  )
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
  )
}


function ListFilterIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <path d="M3 6h18" />
      <path d="M7 12h10" />
      <path d="M10 18h4" />
    </svg>
  )
}


function MoreHorizontalIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <circle cx="12" cy="12" r="1" />
      <circle cx="19" cy="12" r="1" />
      <circle cx="5" cy="12" r="1" />
    </svg>
  )
}


function PlusCircleIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <circle cx="12" cy="12" r="10" />
      <path d="M8 12h8" />
      <path d="M12 8v8" />
    </svg>
  )
}


function SearchIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}