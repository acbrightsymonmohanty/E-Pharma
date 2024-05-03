/* eslint-disable react/no-unescaped-entities */
import React from 'react';

const Testimonial = () => {
    // Array of testimonial data
    const testimonials = [
        {
            id: 1,
            name: 'John Doe',
            position: 'Octuber 17,2023',
            text: "E-Pharma exceeded my expectations. The discount coupons were great, prices were very reasonable, and the delivery was quick and smooth. I would definitely use it again.",
            image: 'https://www.kindpng.com/picc/m/673-6735284_avatar-vector-icon-boy-png-download-png-people.png'
        },
        {
            id: 2,
            name: 'Jane Smith',
            position: 'March 06, 2022',
            text: "I love using the PharmEasy app! They have everything related to health, like medicines, lab tests, and other healthcare essentials, at GREAT prices. Their service is amazing and quick, and the app is also easy to use.",
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKfZS7sKX1MJ7WClhNt2EwP12GbFzpc-09wYP1_VPknMkG1v3JWS9o_WEBAlj0CrrqIy0&usqp=CAU'
        },
        {
            id: 3,
            name: 'Nisha Tomar',
            position: 'June 11, 2023',
            text: "I can't recommend the PharmEasy app enough! It's the perfect one-stop shop for my whole family's healthcare needs. The offers you can get here are beyond what other platforms offer. Customer service, including returns, is also very convenient. This app deserves 5 stars..",
            image: 'https://cdn-icons-png.freepik.com/512/163/163813.png'
        },
        {
            id: 4,
            name: 'Arvind Dingwani',
            position: 'January 15, 2024',
            text: "I recently started using PharmEasy, and I'm already a fan. They have a vast selection of products at affordable prices, which is a huge relief for my wallet. Their delivery is always prompt, and their customer service is top-notch. Thank you.",
            image: 'https://cdn-icons-png.flaticon.com/512/146/146005.png'
        },
        {
            id: 5,
            name: 'Shreya Sharma',
            position: 'March 20, 2024',
            text: "I love using the PharmEasy app! They have everything related to health, like medicines, lab tests, and other healthcare essentials, at GREAT prices. Their service is amazing and quick, and the app is also easy to use.",
            image: 'https://cdn-icons-png.freepik.com/512/4322/4322990.png'
        },
        {
            id: 6,
            name: 'Rajeev Kapoor',
            position: 'December 05, 2023',
            text: "I love using the PharmEasy app! They have everything related to health, like medicines, lab tests, and other healthcare essentials, at GREAT prices. Their service is amazing and quick, and the app is also easy to use.",
            image: 'https://image.pngaaa.com/370/674370-middle.png'
        },
        {
            id: 7,
            name: 'Jane Smith',
            position: 'Febuary 14, 2024',
            text: "I love using the PharmEasy app! They have everything related to health, like medicines, lab tests, and other healthcare essentials, at GREAT prices. Their service is amazing and quick, and the app is also easy to use.",
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmzKw-jmrJqwqG9LFAQ4YtqZIZcsP29l7M92oDNbrpqnVR8c3YJgCjEm6s9H0RcEqMvog&usqp=CAU'
        },
        // Add more testimonial objects as needed
    ];

    return (
        <div className="bg-gray-100">
            <section className="text-gray-600 body-font mb-10">
                <div className="container px-5 py-10 mx-auto">
                    <div className="text-center mb-10">
                        <h1 className="text-3xl font-bold text-black">Testimonial</h1>
                        <h2 className="text-2xl font-semibold mt-4">What our <span className="text-pink-500">customers</span> are saying</h2>
                    </div>

                    <div className="flex flex-nowrap overflow-x-scroll hide-scroll-bar">
                        {/* Testimonial cards */}
                        {testimonials.map(testimonial => (
                            <div key={testimonial.id} className="p-4 flex-shrink-0 w-full lg:w-1/3">
                                <div className="h-full bg-white p-8 rounded">
                                    <img alt="testimonial" className="w-20 h-20 mb-4 object-cover object-center rounded-full mx-auto" src={testimonial.image} />
                                    <p className="leading-relaxed mb-6 text-center">{testimonial.text}</p>
                                    <hr className="border-b-2 border-pink-500 my-6 mx-auto w-16" />
                                    <h2 className="text-gray-900 font-medium title-font tracking-wider text-sm uppercase text-center">{testimonial.name}</h2>
                                    <p className="text-gray-500 text-center">{testimonial.position}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Testimonial;
