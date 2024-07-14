import CardDataComponent  from "@/components/ui/CardData";

const cards_houses_proposed = [
  {
    title: "Apartments on Sale in Vienna",
    description: "A sample of 2000 apartments in Vienna that have been proposed for sale on the platform Willhabe.at",
    substitle1: "Prices ranging from 200K€ to 400K€",
    substitle2: "Areas from 50m2 to 100m2",
    pathToFileURL: "/apartmnt_sale.json",
  },
  {
    title: "Houses on Sale in Vienna",
    description: "A sample of 2000 houses in Vienna that have been proposed for sale on the platform Willhabe.at",
    substitle1: "Prices ranging from 200K€ to 400K€",
    substitle2: "Areas from 50m2 to 100m2",
    pathToFileURL: "/houses.json",
  },
  {
    title: "Apartments for Rent in Vienna",
    description: "A sample of 2000 apartments in Vienna that have been proposed for rent on the platform Willhabe.at",
    substitle1: "Prices ranging from 1000€ to 2000€",
    substitle2: "Areas from 50m2 to 100m2",
    pathToFileURL: "/houses.json",
  },
  {
    title: "Houses for Rent in Vienna",
    description: "A sample of 2000 apartments in Vienna that have been proposed for sale on the platform Willhabe.at",
    substitle1: "Prices ranging from 1000€ to 2000€",
    substitle2: "Areas from 50m2 to 100m2",
    pathToFileURL: "/houses.json",
  },
]


export default function CommunityUpdated() {

  return (
    <>
      <div className="container mx-50 mt-10">
        <div className="flex flex-wrap gap-8">
        {cards_houses_proposed.map((dataset, index) => (
          <div key={index} className="p-1">
            <CardDataComponent {...dataset} />
          </div>
        ))}
        </div>
      </div>
    </>

  );
}
