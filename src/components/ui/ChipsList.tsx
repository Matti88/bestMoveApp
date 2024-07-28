import React from 'react';
import { userSearchStore } from '@/store/user-search'
import ChipWithCheckbox from '@/components/ui/ChipArray';
import { CardContent } from "@/components/ui/shadcn/card"


const ChipList: React.FC = () => {
    // const pois = userSearchStore((state) => state.pois);
    const getPoi = userSearchStore((state) => state.getPoi);
    const activeFilters = userSearchStore((state) => state.activeFilters);
    const list_selectionPoi = activeFilters.selectedPoiIds;
    const toggleSelectedPoi = userSearchStore((state) => state.toggleSelectedPoi);
    
    return (
        <>
            <CardContent className="space-y-4">
                    <div className="flex mb-4">
                        <br />
                        {list_selectionPoi?.map((chip) => (
                            <ChipWithCheckbox
                                key={chip.id}
                                id={chip.id}
                                text={chip.text}
                                isChecked={chip.isChecked}
                                color={ getPoi( chip.id)?.color || '#00bfff'}
                                onToggle={() => toggleSelectedPoi(chip.id)}
                            />
                        ))}
                    </div>
            </CardContent>
        </>
    );
};

export default ChipList;