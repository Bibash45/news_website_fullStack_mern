import { BASE_URL } from "../../../../constants";
import {
  useGetNewsByMarketEconomyQuery,
  useGetNewsByPoliticsQuery,
} from "../../../../features/newsApiSlice";
import {
  CardTextOnly,
  MidCard,
  BigCard,
  SmallHorizontalCard,
  ColumnHead,
  SmallAdvertisement,
} from "../../../index";

const SecondSection = () => {
  const {
    data: newsList,
    isLoading: newsListLoading,
    error: newsListError,
  } = useGetNewsByPoliticsQuery({ keyword: "", pageNumber: 1 });
  const {
    data: marketEconomynewsList,
    isLoading: marketEconomynewsListLoading,
    error: marketEconomynewsListError,
  } = useGetNewsByMarketEconomyQuery({ keyword: "", pageNumber: 1 });

  const midCards = [
    {
      link: "/your-link-url",
      imageSrc: "images/FirstSection/news2.jpg",
      text: "Bear attacks in Japan are at a record high. Climate change and an aging population worsening the problem",
      tag: "",
    },

    // Add more cards as needed
  ];
  const textOnly = [
    {
      link: "/your-link-url",
      text: "Texas Supreme Court blocks pregnant woman from emergency abortion",
    },
    {
      link: "/your-link-url",
      text: "HIV vaccine trial dubbed ‘last roll of the dice’ halted over poor results",
    },
    {
      link: "/your-link-url",
      text: "Bill Nye explains how climate change is affecting our pocket books",
    },
    {
      link: "/your-link-url",
      text: "Tesla failed at battery swapping. Stellantis says it may have the secret",
    },
    {
      link: "/your-link-url",
      text: "‘Not done yet.’ Cristiano Ronaldo scores on his 1,200th game",
    },
  ];
  const bigCard = [
    {
      link: "/your-link-url",
      imageSrc: "images/SecondSection/Feature1.jpg",
      text: "Extinction Rebellion climate activists dye Venice’s Grand Canal green in COP 28 protest",
      tag: "",
    },

    // Add more cards as needed
  ];
  const smallHorizontalCard = [
    {
      link: "/your-link-url",
      imageSrc: "images/SecondSection/Feature2.jpg",
      text: "Her mother vanished when she was 1. Some 40 years later, a phone call from a stranger helped her understand why",
      tag: "",
    },
    {
      link: "/your-link-url",
      imageSrc: "images/SecondSection/Feature3.jpg",
      text: "The grove robbers flooding the market with fake extra virgin olive oil",
      tag: "",
    },

    // Add more cards as needed
  ];
  const smallHorizontalCard3 = [
    {
      link: "/your-link-url",
      imageSrc: "images/SecondSection/n1.jpg",
      text: "Texas Supreme Court blocks pregnant woman from emergency abortion",
      tag: "",
    },
    {
      link: "/your-link-url",
      imageSrc: "images/SecondSection/n2.jpg",
      text: "Analysis: Rishi Sunak is picking a fight on an issue that he probably cannot win",
      tag: "",
    },
    {
      link: "/your-link-url",
      imageSrc: "images/SecondSection/n3.jpg",
      text: "Tesla failed at battery swapping. Stellantis says it may have the secret",
      tag: "",
    },
    {
      link: "/your-link-url",
      imageSrc: "images/SecondSection/n4.jpg",
      text: "‘Massive coup’: Top golfer who once criticized LIV golf joins for $300M",
      tag: "",
    },

    // Add more cards as needed
  ];

  if (newsListLoading || marketEconomynewsListLoading) {
    return <div>Loading...</div>;
  }
  
  return (
    <div className="flex flex-col md:px-8 md:flex-row">
      <div className="w-full md:w-1/3 p-4">
        <ColumnHead columnHeadTag="राजनीति" />
        {newsList.data.slice(1, 2).map((card, index) => (
          <MidCard
            key={index}
            title={card.title}
            imageSrc={`${BASE_URL}/${card.media.images[0]}`}
            tag={card.tags[0]}
          />
        ))}
        {newsList.data.slice(2, 5).map((card, index) => (
          <CardTextOnly
            key={index}
            text={card.title}
            link={"/"}
            color={false}
          />
        ))}
      </div>
      <div className="w-full md:w-1/3 p-4">
        <ColumnHead columnHeadTag="बजार अर्थतन्त्र" />
        {marketEconomynewsList.data.slice(1, 2).map((card, index) => (
          <BigCard
            key={index}
            title={card.title}
            imageSrc={`${BASE_URL}/${card.media.images[0]}`}
            tag={card.tags[0]}
          />
        ))}
        {marketEconomynewsList.data.slice(2, 4).map((card, index) => (
          <SmallHorizontalCard
            key={index}
            text={card.title}
            imageSrc={`${BASE_URL}/${card.media.images[0]}`}
            tag={card.tags[0]}
            {...card}
          />
        ))}
      </div>
      <div className="w-full md:w-1/3 p-4">
        <SmallAdvertisement
          link={"/adv-link"}
          imageSrc={"images/SecondSection/adv.jpg"}
          tag={"Advertisment"}
        />
        <div className="pt-2">
          <h1 className="font-semibold">अन्तर्राष्ट्रिय अपडेट</h1>
          {smallHorizontalCard3.map((card, index) => (
            <SmallHorizontalCard key={index} {...card} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SecondSection;
