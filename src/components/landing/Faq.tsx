import React, { SetStateAction, useState } from 'react';

const Faq = () => {
    const [openSection, setOpenSection] = useState(null);



    const toggleSection = (section: string | null) => {
        setOpenSection(openSection === section ? null : section as unknown as SetStateAction<null>);
    };
    return (
        <section className="py-10 bg-gray-50 sm:py-16 lg:py-24">
            <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                <div className="max-w-2xl mx-auto text-center">
                    <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">Frequently Asked Questions</h2>
                    <p className="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-600">How to use this service the best way possible</p>
                </div>

                <div className="max-w-3xl mx-auto mt-8 space-y-4 md:mt-16">
                    <div className="transition-all duration-200 bg-white border border-gray-200 shadow-lg cursor-pointer hover:bg-gray-50">
                        <button
                            type="button"
                            className="flex items-center justify-between w-full px-4 py-5 sm:p-6"
                            onClick={() => toggleSection('section1')}
                        >
                            <span className="flex text-lg font-semibold text-black">What is a Point of Interest?</span>
                            <svg
                                className={`w-6 h-6 text-gray-400 transform ${openSection === 'section1' ? 'rotate-180' : ''}`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        {openSection === 'section1' && (
                            <div className="px-4 pb-5 sm:px-6 sm:pb-6">
                                <p>A Point of Interest is nothing more than a place where you know you have to visit often when you move into town. An example of a Point of Interest could be an office where you have to work or a school where the kids will frequent.</p>
                            </div>
                        )}
                    </div>

                    <div className="transition-all duration-200 bg-white border border-gray-200 cursor-pointer hover:bg-gray-50">
                        <button
                            type="button"
                            className="flex items-center justify-between w-full px-4 py-5 sm:p-6"
                            onClick={() => toggleSection('section2')}
                        >
                            <span className="flex text-lg font-semibold text-black">What is an Isochrone?</span>
                            <svg
                                className={`w-6 h-6 text-gray-400 transform ${openSection === 'section2' ? 'rotate-180' : ''}`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        {openSection === 'section2' && (
                            <div className="px-4 pb-5 sm:px-6 sm:pb-6">
                                <p>An isochrone is a line on a map connecting points that can be reached within a specific time frame from a given starting point. n simpler terms, it's a contour line that shows all the places you can reach within a certain amount of time using a particular mode of transportation (like walking, biking, or driving). We have four mode of transportations: Transit Mode, Walking, Biking, and Driving. Transit Mode means that you can use public transportation to get to your destination.</p>
                            </div>
                        )}
                    </div>

                    <div className="transition-all duration-200 bg-white border border-gray-200 cursor-pointer hover:bg-gray-50">
                        <button
                            type="button"
                            className="flex items-center justify-between w-full px-4 py-5 sm:p-6"
                            onClick={() => toggleSection('section3')}
                        >
                            <span className="flex text-lg font-semibold text-black">Where do you get the avialable listings?</span>
                            <svg
                                className={`w-6 h-6 text-gray-400 transform ${openSection === 'section3' ? 'rotate-180' : ''}`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        {openSection === 'section3' && (
                            <div className="px-4 pb-5 sm:px-6 sm:pb-6">
                                <p>For the moment we are sourcing the avialable listings from various websites and from these websites we are using only a subset of the listings as we try to keep the listings up to date and exclude outliers (<a href='/#/communutyupdated' title="" className="text-blue-600 transition-all duration-200 hover:underline">see community databases</a>). We make sure to assign the correct geolocation for every possible listing and this takes time. It is possible that some of the listings are not updated.</p>
                            </div>
                        )}
                    </div>

                    <div className="transition-all duration-200 bg-white border border-gray-200 cursor-pointer hover:bg-gray-50">
                        <button
                            type="button"
                            className="flex items-center justify-between w-full px-4 py-5 sm:p-6"
                            onClick={() => toggleSection('section4')}
                        >
                            <span className="flex text-lg font-semibold text-black">Is this service free? Why only Vienna, AT?</span>
                            <svg
                                className={`w-6 h-6 text-gray-400 transform ${openSection === 'section4' ? 'rotate-180' : ''}`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        {openSection === 'section4' && (
                            <div className="px-4 pb-5 sm:px-6 sm:pb-6">
                                <p>For now yes, this service is free. It is a personal project that is shaping into a bigger and bigger idea. As you can see there is no cookie required. This project starts with Vienna because it is the ideal location where to test these ideas. We intend do expand the number of locations later on.</p>
                            </div>
                        )}
                    </div>
                </div>
                <p className="text-center text-gray-600 text-base mt-9">
                    Didn't find the answer you are looking for? 
                    <a href="mailto:youremail@example.com" title="Contact our support" className="font-medium text-blue-600 transition-all duration-200 hover:text-blue-700 focus:text-blue-700 hover:underline">
                        Contact our support
                    </a>
                </p>
            </div>
        </section>
    );
};

export default Faq;
