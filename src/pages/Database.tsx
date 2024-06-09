import { SVGProps, useEffect, useState } from "react";
import { JSX } from "react/jsx-runtime";
import { NavLink } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"
import { useParams } from "react-router-dom";
import { getHouseById, House, updateHouse, removeHouse, ReadHouse, addHouse } from '../database'

//TODO: add a button to add a new house to the database, make it available whenever a houseId is null

export default function Database() {

  const { id } = useParams();
  const houseId = Number(id); // Convert the id to a number

  const [house, setHouse] = useState<House | null>(null);
  const [title, setTitle] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const [latitude, setLatitude] = useState<number>(0);


  useEffect(() => {
    const fetchData = async () => {
      if (Number.isInteger(houseId)) {
        const house_ = await getHouseById(houseId);
        // Do something with the fetched house
        setHouse(house_);
        setTitle(house_?.title ?? "");
        setAddress(house_?.address ?? "");
        setPrice(house_?.price ?? 0);
        setLongitude(house_?.longitude ?? 0);
        setLatitude(house_?.latitude ?? 0);
      } else {
        console.log("New house Entry");
      }
    };


    fetchData();
  }, [houseId]);



  const handleSubmit = async ( ) => {
    //e.preventDefault();  
    const updatedHouse: ReadHouse = {
      id: houseId,
      title,
      address,
      price,
      longitude,
      latitude,
      image_url: house?.image_url ?? "",
      date: new Date().toISOString().split('T')[0],
    };
    await updateHouse(updatedHouse);
    window.location.href = "/#/houses";
  };

  const handleDelete = async () => {
    if (house) {
      await removeHouse(houseId)
      window.location.href = "/#/houses"
    }
  }


  const createNewHouse = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newHouse: House = {
      address,
      price,
      image_url: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      longitude,
      latitude,
      title,
      date: new Date().toISOString().split('T')[0],
    };
    await addHouse(newHouse);
    window.location.href = "/#/houses";
  };

  return (
    <>
      <div className="container mx-auto py-8 px-4 md:px-6">
        <div className="flex items-center mb-6">
          <NavLink to="/houses" className="inline-flex items-center text-primary hover:text-primary-dark" >
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
          </NavLink>
          <h1 className="text-3xl font-bold ml-auto">Database Entry</h1>
        </div>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="title">
                Title
              </label>
              <Input
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                id="title"
                placeholder="Enter title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="address">
                Address
              </label>
              <Input
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                id="address"
                placeholder="Enter address"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="price">
                Price
              </label>
              <Input
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                id="price"
                placeholder="Enter price"
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="longitude">
                Longitude
              </label>
              <Input
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                id="longitude"
                placeholder="Enter longitude"
                type="number"
                value={longitude}
                onChange={(e) => setLongitude(Number(e.target.value))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="latitude">
                Latitude
              </label>
              <Input
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                id="latitude"
                placeholder="Enter latitude"
                type="number"
                value={latitude}
                onChange={(e) => setLatitude(Number(e.target.value))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Uploaded file thumbnail
              </label>
              <div className="mt-4">
                <img
                  alt="Uploaded file thumbnail"
                  className="rounded-md"
                  height="200"
                  src={house?.image_url ?? ""}
                  style={{
                    aspectRatio: "300/200",
                    objectFit: "cover",
                  }}
                  width="300"
                />
              </div>
            </div>
          </div>

          {(Number.isInteger(houseId)) ?

            <div className="flex items-center justify-end mt-4">
              <Button
                type="submit"
                onClick={ handleSubmit}
              >
                Save Changes
              </Button>

              <Button
                type="button"
                className="ml-2 inline-flex items-center justify-center px-4 py-2 border border-transparent text-white font-medium rounded-md bg-destructive shadow-sm hover:bg-destructive-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-destructive sm:text-sm"
                onClick={handleDelete}
              >
                Delete Record
              </Button>
            </div>
            :
            <div className="flex items-center justify-end mt-4">
              <Button
                type="submit"
                onClick={createNewHouse}
              >
                Create New House
              </Button>
            </div>
          }

        </form>
      </div>
    </>
  )
}


function ArrowLeftIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  )
}


function UploadCloudIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
      <path d="M12 12v9" />
      <path d="m16 16-4-4-4 4" />
    </svg>
  )
}

