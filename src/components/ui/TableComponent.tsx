
import { useState } from "react";
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/shadcn/card";
import { TableHead, TableRow, TableHeader, TableBody, Table } from "@/components/ui/shadcn/table";
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationNext } from "@/components/ui/shadcn/pagination";
import { HouseListing } from "@/store/houselistingStore";

type direction = 'next' | 'previous' | 'middle';

interface TableComponentProps {
    houses: HouseListing[]
}

function generateArray(input: number) {
    const maxNumber = input > 20 ? 3 : input > 10 ? 2 : 1;
    return Array.from({ length: maxNumber }, (_, i) => i + 1);
}

function TableComponent({ houses }: TableComponentProps) 
{

    // States for "all" houses
    const [currentPageAll, setCurrentPageAll] = useState(1);
    const [middlePagesAll, setMiddlePagesAll] = useState<number[]>(generateArray(houses.length));
    const itemsPerPage = 10;


    // Utility function to calculate the middle pages
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

    // Handle page change for "all" houses
    const handlePageChangeAll = (pageNumber: number, dir: direction, housesCount: number) => {
        setCurrentPageAll((prevPageNumber) => {
            let newPageNumber = prevPageNumber;

            if (dir === 'previous' || dir === 'next') {
                if (dir === 'next') {
                    newPageNumber = Math.min(Math.ceil(housesCount / itemsPerPage), pageNumber + 1);
                    setMiddlePagesAll(checkAndSelectElements(housesCount, [newPageNumber - 1, newPageNumber, newPageNumber + 1]));
                } else if (dir === 'previous') {
                    newPageNumber = Math.max(1, pageNumber - 1);
                    setMiddlePagesAll(checkAndSelectElements(housesCount, [newPageNumber, newPageNumber + 1, newPageNumber + 2]));
                }
            } else {
                newPageNumber = pageNumber;
            }

            return newPageNumber;
        });
    };


    return (
        <>
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
                            {houses.slice((currentPageAll - 1) * itemsPerPage, currentPageAll * itemsPerPage).map((house) => (
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
                                    <PaginationPrevious onClick={() => handlePageChangeAll(currentPageAll, 'previous', houses.length)} />
                                </PaginationItem>
                                {middlePagesAll.map((index) => (
                                    <PaginationItem key={index}>
                                        <PaginationLink onClick={() => handlePageChangeAll(index, 'middle', houses.length)} isActive={currentPageAll === index}>
                                            {index}
                                        </PaginationLink>
                                    </PaginationItem>
                                ))}
                                <PaginationItem>
                                    <PaginationNext onClick={() => handlePageChangeAll(currentPageAll, 'next', houses.length)} />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                </CardContent>
                <CardFooter>
                    <div className="text-xs text-muted-foreground">
                        Showing <strong>{(currentPageAll - 1) * itemsPerPage + 1}</strong> to <strong>{Math.min(currentPageAll * itemsPerPage, houses.length)}</strong> of <strong>{houses.length}</strong> houses
                    </div>
                </CardFooter>
            </Card>
        </>
    )
}


export default TableComponent;
