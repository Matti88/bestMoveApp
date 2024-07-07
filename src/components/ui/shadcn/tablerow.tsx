import { Button } from "@/components/ui/shadcn/button"
import { DropdownMenuTrigger,  DropdownMenu, } from "@/components/ui/shadcn/dropdown-menu";
import { TableRow,  TableCell,  } from "@/components/ui/shadcn/table";
import { SVGProps } from "react"

/**
 * Renders a table row with product information.
 *
 * @param {Object} props - The props object.
 * @param {string | null} [props.image] - The image URL of the product.
 * @param {string} props.title - The title of the product.
 * @param {string} props.status - The status of the product.
 * @param {number} props.price - The price of the product.
 * @param {string} props.date - The date of the product.
 * @return {JSX.Element} The rendered table row.
 */
export const TableRow2 = ({
  id,
  image,
  title,
  address,
  price, 
  date,
}: {
  id: number;
  image?: string | null;
  title: string;
  address: string;
  price: number; 
  date: string;
}): JSX.Element => {
  return (
    <TableRow>
      <TableCell className="hidden sm:table-cell">
        {image && (
          <img
            alt="Product image"
            className="aspect-square rounded-md object-cover"
            height="64"
            src={image}
            width="64"
          />
        )}
      </TableCell>
      <TableCell className="font-medium">{title}</TableCell>
      <TableCell className="hidden md:table-cell">{price}</TableCell>
      <TableCell className="hidden md:table-cell">{address}</TableCell>
      <TableCell className="hidden md:table-cell">{date}</TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost">
              <MoreHorizontalIcon className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          {/* <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <Link to={`/database/${id}`}><DropdownMenuItem>
              Edit
            </DropdownMenuItem></Link>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent> */}
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};



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

