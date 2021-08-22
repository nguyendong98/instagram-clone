import React from 'react';
import {footerItem} from 'constants/footer-items';


export default function Footer() {
    return (
        <div className="flex items-center flex-wrap w-11/12 md:w-6/12 justify-center mx-auto mb-12">
            {
                footerItem.map((val, i) => (
                    <div className="text-gray-base text-sm mr-4" key={i}>{ val }</div>
                ))

            }
            <div className="flex justify-center items-center w-full mt-3">
                <select className="text-gray-base focus:no-underline text-sm">
                    <option>Tiếng Việt</option>
                    <option>English</option>
                </select>
                <div className="text-gray-base text-sm">
                    © 2021 Instagram from Facebook
                </div>

            </div>
        </div>
    )
}
