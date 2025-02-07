import React from "react";

import { MidCard, CardTextOnly, BigBannerAdvertisement } from "../../../index";

function TenthSection() {
  const midCards = [
    {
      imageSrc: "images/EleventhSection/11.jpg",
      text: "ह्ग्सूइ क्गस्क्द ओइजोज्स्दो  गिज्सोइड जगी जिओस्ज्ग ज ओइजोइस्द ओजिओग्द्स्ज जिस्द्जगिओज्द्स ह्गिओद्शिगोअ इज्गिओस्ज्गोइ गिओस्ध्गिओअस्द ग्द्सिओगिओस्ज ",
      color: "black",
    },

    // Add more cards as needed
  ];

  return (
    <div>
      <h2 className="pt-6 px-12 pb-2 text-4xl bg-black text-white font-bold">
        हाम्रो हुम्ला!
      </h2>
      <div className="px-8 flex flex-wrap bg-black">
        <div className="w-full md:w-3/5 p-4 ">
          {midCards.map((card, index) => (
            <div key={index} className="mb-4">
              <MidCard {...card} />
            </div>
          ))}
        </div>

        <div className="w-full md:w-2/5 p-4">
          <p className="text-white text-opacity-50 text-xs md:text-md lg:text-3xl">
          उनीहरूले पूर्वको मेची भन्सारदेखि पश्चिमको गड्डाचौकी कञ्चनपुर भन्सार कार्यालयसम्मका छोटी भन्सार तथा पैदल यात्रु ओहोरदोहोर गर्ने क्षेत्रहरूबाट दिनभर सामान बोक्ने काम मात्रै काम गरेका हुन्छन्। धेरै यस्ता नागरिकहरू शारीरिक रूपमा अशक्त, वृद्ध, महिला तथा बालबालिका बढी हुन्छन्।
          उनीहरूले पूर्वको मेची भन्सारदेखि पश्चिमको गड्डाचौकी कञ्चनपुर भन्सार कार्यालयसम्मका छोटी भन्सार तथा पैदल यात्रु ओहोरदोहोर गर्ने क्षेत्रहरूबाट दिनभर सामान बोक्ने काम मात्रै काम गरेका हुन्छन्। धेरै यस्ता नागरिकहरू शारीरिक रूपमा अशक्त, वृद्ध, महिला तथा बालबालिका बढी हुन्छन्।
          उनीहरूले पूर्वको मेची भन्सारदेखि पश्चिमको गड्डाचौकी कञ्चनपुर भन्सार कार्यालयसम्मका छोटी भन्सार तथा पैदल यात्रु ओहोरदोहोर गर्ने क्षेत्रहरूबाट दिनभर सामान बोक्ने काम मात्रै काम गरेका हुन्छन्। धेरै यस्ता नागरिकहरू शारीरिक रूपमा अशक्त, वृद्ध, महिला तथा बालबालिका बढी हुन्छन्।
          </p>
        </div>
      </div>
    </div>
  );
}

export default TenthSection;
