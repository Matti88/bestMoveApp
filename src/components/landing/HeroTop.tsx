
import { Button } from "@/components/ui/shadcn/button";
import { useNavigate } from "react-router-dom";

const HeroTop = () => {
    const navigate = useNavigate();
    return (
        <>
            <section className="pt-12 bg-gradient-to-b from-gray-50 via-white to-gray-50">
                <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                    <div className="grid max-w-md grid-cols-1 mx-auto lg:grid-cols-12 gap-x-6 gap-y-8 lg:max-w-none">
                        <div className="self-center lg:col-span-4">
                            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl xl:text-5xl">Welcome to bestMove 🏠  Search and find the best location for you 🗝️.</h1>
                            <p className="mt-5 text-base font-normal leading-7 text-gray-500">Use our advanced calculations to find the best house or apartment for you. </p>
                            <div className="relative inline-flex mt-9 group">
                                <div className="absolute transitiona-all duration-1000 opacity-70 inset-0 bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg filter group-hover:opacity-100 group-hover:duration-200"></div>

                                <Button
                                    title=""
                                    className="relative inline-flex items-center justify-center px-8 py-3 sm:text-sm sm:py-3.5 text-base font-semibold text-white transition-all duration-200 bg-indigo-600 border border-transparent rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                                    role="button"
                                    onClick={() => {
                                        navigate('/mapwork')
                                    }} //redirect to /mapwork
                                >
                                    Go to Mapwork
                                </Button>
                            </div>
                        </div>

                        <div className="self-end lg:order-last lg:pb-20 lg:col-span-3">
                            <p className="text-xs font-bold tracking-widest text-gray-500 uppercase">⚡️ App's Features</p>

                            <div className="mt-6 space-y-6 lg:space-y-8">
                                <div className="relative overflow-hidden">
                                    <div className="flex items-start lg:items-center">
                                        <img className="object-cover w-12 h-12 rounded-lg shrink-0" src="/pins.jpg" alt="" />
                                        <p className="ml-5 text-base font-bold leading-6 text-gray-900">
                                            <a href="#" title="">
                                                Access to to the exact location of thousands of listings
                                                <span className="absolute inset-0" aria-hidden="true"></span>
                                            </a>
                                        </p>
                                    </div>
                                </div>

                                <div className="relative overflow-hidden">
                                    <div className="flex items-start lg:items-center">
                                        <img className="object-cover w-12 h-12 rounded-lg shrink-0" src="/prosAndConst.jpg" alt="" />
                                        <p className="ml-5 text-base font-bold leading-6 text-gray-900">
                                            <a href="#" title="">
                                                Compare the distance in terms of time and cost from any of your point of interest
                                                <span className="absolute inset-0" aria-hidden="true"></span>
                                            </a>
                                        </p>
                                    </div>
                                </div>

                                <div className="relative overflow-hidden">
                                    <div className="flex items-start lg:items-center">
                                        <img className="object-cover w-12 h-12 rounded-lg shrink-0" src="/download.jpg" alt="" />
                                        <p className="ml-5 text-base font-bold leading-6 text-gray-900">
                                            <a href="#" title="">
                                                Download a shortlist of the best houses or apartments for you
                                                <span className="absolute inset-0" aria-hidden="true"></span>
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="self-end lg:col-span-5">
                            <img className="w-full mx-auto" src="/passing_keys.webp" alt="" />
                        </div>
                    </div>
                </div>
            </section>
            </>
    
    )
}

export default HeroTop;

