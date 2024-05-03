import { useNavigate } from "react-router";

// category 
const category = [
    {
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Medicine_Drugs.svg/2560px-Medicine_Drugs.svg.png',
        name: 'Medicine'
    },
    {
        image: 'https://cdn-icons-png.flaticon.com/512/3901/3901586.png',
        name: 'Personal Care'
    },
    {
        image: 'https://cdn-icons-png.flaticon.com/256/1806/1806263.png',
        name: 'Elderly Care'
    },
    {
        image: 'https://cdn-icons-png.freepik.com/256/2413/2413553.png?semt=ais_hybrid',
        name: 'Skin Care'
    },
    {
        image: 'https://globalsymbols.com/uploads/production/image/imagefile/6709/14_6709_3d086b20-2d44-43f7-b80c-ccecd147a5f4.svg',
        name: 'Food and Drinks'
    },
    {
        image: 'https://cdn.iconscout.com/icon/premium/png-256-thumb/consent-5512010-4619276.png',
        name: 'Sexual Wellness'
    },
    {
        image: 'https://cdn1.iconfinder.com/data/icons/medical-center-filled/64/Herbal-512.png',
        name: 'Ayurvedic Care'
    },
    {
        image: 'https://cdn-icons-png.flaticon.com/512/6080/6080308.png',
        name: 'Home Care'
    }
]

const Category = () => {
    // naviaget 
    const navigate = useNavigate();
    return (
        <div>
            <div className="flex flex-col mt-5">
                {/* main 1 */}
                <div className="flex overflow-x-scroll lg:justify-center  hide-scroll-bar">
                    {/* main 2  */}
                    <div className="flex ">
                        {/* category  */}
                        {category.map((item, index) => {
                            return (
                                <div key={index} className="px-3 lg:px-10">
                                    {/* Image  */}
                                    <div onClick={() => navigate(`/category/${item.name}`)} className=" w-16 h-16 lg:w-24 lg:h-24 max-w-xs rounded-full  bg-pink-500 transition-all hover:bg-pink-400 cursor-pointer mb-1 " >
                                        <div className="flex justify-center mb-12">
                                            {/* Image tag  */}
                                            <img src={item.image} alt="img" />
                                        </div>
                                    </div>

                                    {/* Name Text  */}
                                    <h1 className=' text-sm lg:text-lg text-center font-medium title-font first-letter:uppercase '>{item.name}</h1>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            {/* style  */}
            <style dangerouslySetInnerHTML={{ __html: "\n.hide-scroll-bar {\n  -ms-overflow-style: none;\n  scrollbar-width: none;\n}\n.hide-scroll-bar::-webkit-scrollbar {\n  display: none;\n}\n" }} />
        </div>
    );
}

export default Category;