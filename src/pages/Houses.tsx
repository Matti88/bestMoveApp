import { useState } from "react";
import { Button } from "@/components/ui/shadcn/button";
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card";
import { TableHead, TableRow, TableHeader, TableBody, Table } from "@/components/ui/shadcn/table";
import { SVGProps } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/shadcn/tabs"
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationNext } from "@/components/ui/pagination";
import houselistingStore from '@/store/houselistingStore';
import FileUploader from '@/components/ui/fileUploader';

type direction = 'next' | 'previous' | 'middle';


export default function Houses() {
  const houses = houselistingStore((state) => state.houseListings);
  const filteredhouses = houselistingStore((state) => state.houseListings.filter(house => house.displayed));
  const updateHouseListings = houselistingStore((state) => state.updateHouseListings);
  const [currentPage, setCurrentPage] = useState(1);
  const [middlePages, setMiddlePages] = useState<number[]>([1, 2, 3]);
  const itemsPerPage = 10;

  // Calculate total number of pages
  const totalPages = Math.ceil(houses.length / itemsPerPage);

  // Calculate houses to display on the current page
  const displayedHouses = houses.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);


    // Calculate houses to display on the current page
  const displayedHousesFiltered = filteredhouses.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);


  function checkAndSelectElements(amountOfHouses: number, paginationArray: number[]) {
    let range;
    
    if (amountOfHouses >= 0 && amountOfHouses <= 10) {
      range = 1;
    } else if (amountOfHouses >= 11 && amountOfHouses <= 20) {
      range = 2;
    } else if (amountOfHouses > 20) {
      range = 3;
    } else {
      throw new Error("Number is out of valid range.");
    }
    
    switch (range) {
      case 1:
        return paginationArray.slice(0, 1);  // until first element
      case 2:
        return paginationArray.slice(0, 2);  // until second element
      case 3:
        return paginationArray.slice(0, 3);  // until third element
      default:
        return [];
    }
  }

  const handlePageChange = (pageNumber: number, dir: direction, housesCount : number) => {

    setCurrentPage((prevPageNumber) => {

      let newPageNumber = prevPageNumber;

      if (dir === 'previous' || dir === 'next') {
        if (dir === 'next') {

          newPageNumber = Math.min(totalPages, pageNumber + 1)
          setMiddlePages(checkAndSelectElements(housesCount, [newPageNumber - 1, newPageNumber, newPageNumber + 1]));

        } else if (dir === 'previous') {

          newPageNumber = Math.max(1, pageNumber - 1)
          setMiddlePages(checkAndSelectElements(housesCount,[newPageNumber, newPageNumber + 1, newPageNumber + 2]) );
        }

        return newPageNumber;
      }
      else {
        newPageNumber = pageNumber
        return newPageNumber;
      }


    });
  };

  return (
    <>
      <div className="flex flex-col items-center mt-10 gap-10">
        <Card className="w-full mx-auto px-10">
          <CardHeader>
            <CardTitle>Upload a File</CardTitle>
          </CardHeader>
          <CardContent>
            <FileUploader />
          </CardContent>
        </Card>
        <div className="flex items-center gap-20">
          <div className="ml-auto flex items-center gap-20">
            <Button className="h-8 gap-1" size="sm" variant="outline">
              <FileIcon className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Export</span>
            </Button>
            <Button className="h-8 gap-1" size="sm" variant="outline" onClick={() => updateHouseListings([])}>
              <FileIcon className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Reset Houses</span>
            </Button>
          </div>
        </div>
        <div className="w-full">
          <Tabs defaultValue="all" >
            <TabsList>
              <TabsTrigger value="all">All houses</TabsTrigger>
              <TabsTrigger value="filtered">Filtered Houses</TabsTrigger>            
            </TabsList>

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
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {displayedHouses.map((house) => (
                        <TableRow key={house.id}>
                          <td className="hidden sm:table-cell">
                            <img src={house.image} alt={house.title} className="w-10 h-10 object-cover" />
                          </td>
                          <td>{house.title}</td>
                          <td>{house.price}</td>
                          <td>{house.sqm}</td>
                          <td className="hidden md:table-cell">{house.address}</td>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <div className="px-6 py-4 border-t">
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious
                            onClick={() => handlePageChange(currentPage, 'previous', houses.length)}
                          />
                        </PaginationItem>
                        {middlePages.map((index) => (
                          <PaginationItem key={index}>
                            <PaginationLink
                              onClick={() => handlePageChange(index + 1, 'middle', houses.length)}
                              isActive={currentPage === index + 1}
                            >
                              {index}
                            </PaginationLink>
                          </PaginationItem>
                        ))}

                        <PaginationItem>
                          <PaginationNext
                            onClick={() => handlePageChange(currentPage, 'next', houses.length)}
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="text-xs text-muted-foreground">
                    Showing <strong>{(currentPage - 1) * itemsPerPage + 1}</strong> to <strong>{Math.min(currentPage * itemsPerPage, houses.length)}</strong> of <strong>{houses.length}</strong> houses
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="filtered">
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
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {displayedHousesFiltered.map((house) => (
                        <TableRow key={house.id}>
                          <td className="hidden sm:table-cell">
                            <img src={house.image} alt={house.title} className="w-10 h-10 object-cover" />
                          </td>
                          <td>{house.title}</td>
                          <td>{house.price}</td>
                          <td>{house.sqm}</td>
                          <td className="hidden md:table-cell">{house.address}</td>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <div className="px-6 py-4 border-t">
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious
                            onClick={() => handlePageChange(currentPage, 'previous', displayedHousesFiltered.length)}
                          />
                        </PaginationItem>
                        {middlePages.map((index) => (
                          <PaginationItem key={index}>
                            <PaginationLink
                              onClick={() => handlePageChange(index + 1, 'middle', displayedHousesFiltered.length)}
                              isActive={currentPage === index + 1}
                            >
                              {index}
                            </PaginationLink>
                          </PaginationItem>
                        ))}

                        <PaginationItem>
                          <PaginationNext
                            onClick={() => handlePageChange(currentPage, 'next', displayedHousesFiltered.length)}
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="text-xs text-muted-foreground">
                    Showing <strong>{(currentPage - 1) * itemsPerPage + 1}</strong> to <strong>{Math.min(currentPage * itemsPerPage, displayedHousesFiltered.length)}</strong> of <strong>{displayedHousesFiltered.length}</strong> filtered houses
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
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
  );
}
