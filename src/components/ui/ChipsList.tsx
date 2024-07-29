import React from 'react';
import { userSearchStore } from '@/store/user-search';
import ChipArray from '@/components/ui/ChipArray';
import { CardContent } from "@/components/ui/shadcn/card";

const ChipList: React.FC = () => {
    const list_selectionPoi = userSearchStore((state) => state.activeFilters.selectedPoiIds);
    const toggleSelectedPoi = userSearchStore((state) => state.toggleSelectedPoi);

    console.log("list_selectionPoi", list_selectionPoi);

    return (
        <>
            <CardContent className="space-y-4">
                <div className="flex mb-4">
                    <br />
                    {list_selectionPoi?.map((chip, index) => (
                        <ChipArray
                            key={index}
                            id={chip.id}
                            text={chip.text}
                            isChecked={chip.isChecked}
                            poiColor={chip.poiColor} // Ensure default color
                            onToggle={() => toggleSelectedPoi(chip.id)}
                        />
                    ))}
                </div>
            </CardContent>
        </>
    );
};

export default ChipList;
