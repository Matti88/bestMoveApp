import React, { useCallback } from 'react';
import * as XLSX from 'xlsx';
import houselistingStore from '@/store/houselistingStore';

interface DragEvent extends React.DragEvent<HTMLDivElement> {
    customDataTransfer: { files: FileList };
}


const FileInput: React.FC = () => {
    const addHouseListings = houselistingStore((state) => state.addHouseListings); // Get the addHouseListings method from the store

    const handleDrop = useCallback((event: DragEvent) => {
        event.preventDefault();
        const file = event.customDataTransfer.files[0];

        if (file.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
            alert('Only Excel files are supported.');
            return;
        }

        // Process the Excel file here
        const reader = new FileReader();
        reader.onload = (e) => {
            const data = e.target?.result;
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet) as Array<{
                title: string;
                image: string;
                lon: number;
                lat: number;
                address: string;
                price: number;
                sqm: number;
            }>;

            const filteredData = jsonData
                .filter(item => item.title && item.image && item.lon && item.lat && item.address && item.price && item.sqm)
                .map(item => ({
                    title: item.title,
                    image: item.image,
                    lon: item.lon,
                    lat: item.lat,
                    address: item.address,
                    price: item.price,
                    sqm: item.sqm,
                }));

            addHouseListings(filteredData); 

        };
        reader.readAsArrayBuffer(file);
    }, []);
const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
}, []);

return (
    <div className="flex items-center justify-center w-full" onDragOver={handleDragOver}>
        <label
            htmlFor="file-upload"
            className="flex flex-col items-center justify-center w-64 h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
            onDrop={handleDrop as unknown as React.DragEventHandler<HTMLLabelElement>}
        >

                <svg
                    aria-hidden="true"
                    className="w-10 h-10 mb-3 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 16V8m0 0l-4 4m4-4l4 4m5-4v8m0 0l-4-4m4 4l4-4"
                    ></path>
                </svg>
                <p className="mb-2 text-sm text-gray-500">Drag and drop an Excel file here</p>
                <p className="text-xs text-gray-500">or click to select a file</p>
                <input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    accept='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                    onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                            handleDrop({
                                customDataTransfer: { files: e.target.files },
                                preventDefault: () => {},
                            } as DragEvent);
                        }
                    }}
                />
            </label>
        </div>
    );
};

export default FileInput;

