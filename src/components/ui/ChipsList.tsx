import React from 'react';
import { userSearchStore } from '@/store/user-search'
import ChipWithCheckbox from '@/components/ui/ChipArray';

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/shadcn/card"
import exp from 'constants';

const ChipList: React.FC = () => {
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
                                onToggle={() => toggleSelectedPoi(chip.id)}
                            />
                        ))}
                    </div>

            </CardContent>
        </>
    );
};

export default ChipList;