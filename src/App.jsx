import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./App.css";
import { ceMmDateTime } from "./assets/ceMmDateTime.js"; // Ensure this path is correct
import { Analytics } from "@vercel/analytics/react";

const App = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [burmeseData, setBurmeseData] = useState(null);

  const convertToBurmeseDate = (selectedDate) => {
    if (typeof ceMmDateTime === "undefined") {
      setBurmeseData(null);
      return;
    }
    // eslint-disable-next-line no-undef
    const mdt = new ceMmDateTime();
    //get year, month, day from selectedDate
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth() + 1; // Months are 0-indexed
    const day = selectedDate.getDate();
    mdt.SetDateTime(year, month, day);
    setBurmeseData(mdt);
  };
  useEffect(() => {
    convertToBurmeseDate(selectedDate);
  }, [selectedDate]);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 font-montserrat">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-2">
            English to Burmese Calendar Converter
          </h1>
          <p className="text-gray-600">
            Select a date to see its Burmese calendar equivalent
          </p>
        </header>

        <div className="flex flex-col lg:flex-row gap-6 h-auto">
          <div className="lg:w-2/5 bg-white rounded-xl shadow-lg p-6 border border-gray-200 text-center">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              English Calendar
            </h2>
            <p className="text-gray-600 mb-6 text-lg">
              Selected:{" "}
              <span className="font-medium text-blue-600">
                {selectedDate.toDateString()}
              </span>
            </p>
            <div className="calendar-container">
              <Calendar
                onChange={setSelectedDate}
                value={selectedDate}
                calendarType="gregory"
              />
            </div>
          </div>

          <div className="flex-1 bg-gradient-to-br from-amber-50 to-orange-100 rounded-xl shadow-lg p-6 border-2 border-orange-200">
            <h2 className="text-2xl font-semibold text-orange-800 mb-6 text-center">
              🇲🇲 Myanmar Calendar Information
            </h2>

            {/* Main Myanmar Date Display */}
            <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-xl p-3 mb-6 text-white text-center shadow-lg">
              <h3 className="text-lg font-medium mb-2">Myanmar Date</h3>
              <p className="text-xl font-bold">
                {burmeseData
                  ? burmeseData.ToMString() +
                    " " +
                    ["🌑", "🌓", "🌕", "🌗"][
                      burmeseData.ToMString("&P") == "Waning"
                        ? 3 // လ ပြည့်ကျော်
                        : burmeseData.ToMString("&P") == "Waxing"
                        ? 1 // လဆန်း
                        : burmeseData.ToMString("&P") == "New Moon"
                        ? 0 // လ ကွယ်
                        : 2 // လ ပြည့်
                    ]
                  : "Loading..."}
              </p>
            </div>
            {/* Moon Phase Display */}
            {/* <div className="bg-gradient-to-br from-amber-100 to-yellow-100 rounded-lg p-3 border border-amber-200 mb-5">
            <div className="text-center">
              <span className="text-gray-700 block text-sm">Moon Phase</span>
              <span className="font-semibold text-amber-700 text-lg">
                {burmeseData
                  ? ["🌑", "🌓", "🌕", "🌗"][
                      burmeseData.ToMString("&P") == "Waning"
                        ? 3 // လ ပြည့်ကျော်
                        : burmeseData.ToMString("&P") == "Waxing"
                        ? 1 // လဆန်း
                        : burmeseData.ToMString("&P") == "New Moon"
                        ? 0 // လ ကွယ်
                        : 2 // လ ပြည့်
                    ]
                  : "🌙"}
              </span>
            </div>
          </div> */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Calendar Information */}
              <div className="space-y-3">
                <h4 className="text-lg font-semibold text-orange-800 border-b border-orange-300 pb-1">
                  📅 Calendar Details
                </h4>

                <div className="bg-white/80 rounded-lg p-3 border border-orange-200">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Sasana Year:</span>
                    <span className="font-semibold text-orange-700">
                      {burmeseData ? burmeseData.sy : "---"}
                    </span>
                  </div>
                </div>

                <div className="bg-white/80 rounded-lg p-3 border border-orange-200">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Sasana Year Year:</span>
                    <span className="font-semibold text-orange-700">
                      {burmeseData ? burmeseData.my : "---"}
                    </span>
                  </div>
                </div>

                <div className="bg-white/80 rounded-lg p-3 border border-orange-200">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Month:</span>
                    <span className="font-semibold text-orange-700">
                      {burmeseData ? burmeseData.ToMString("&M") : "---"}
                    </span>
                  </div>
                </div>

                <div className="bg-white/80 rounded-lg p-3 border border-orange-200">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Day:</span>
                    <span className="font-semibold text-orange-700">
                      {burmeseData ? burmeseData.mf : "---"}
                    </span>
                  </div>
                </div>

                <div className="bg-white/80 rounded-lg p-3 border border-orange-200">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Weekday:</span>
                    <span className="font-semibold text-orange-700">
                      {burmeseData ? burmeseData.ToString("%W") : "---"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Astrological Information */}
              <div className="space-y-3">
                <h4 className="text-lg font-semibold text-orange-800 border-b border-orange-300 pb-1">
                  ⭐ Astrological Info
                </h4>

                <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg p-3 border border-purple-200">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Sabbath:</span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        burmeseData && burmeseData.sabbath === ""
                          ? "bg-red-200 text-red-800"
                          : "bg-green-200 text-green-800"
                      }`}
                    >
                      {burmeseData
                        ? burmeseData.sabbath === ""
                          ? "No"
                          : burmeseData.sabbath
                        : "---"}
                    </span>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg p-3 border border-blue-200">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Yatyaza:</span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        burmeseData && burmeseData.yatyaza === ""
                          ? "bg-red-200 text-red-800"
                          : "bg-green-200 text-green-800"
                      }`}
                    >
                      {burmeseData
                        ? burmeseData.yatyaza === ""
                          ? "No"
                          : "✅ Yes"
                        : "---"}
                    </span>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg p-3 border border-green-200">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Pyathada:</span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        burmeseData && burmeseData.pyathada === ""
                          ? "bg-red-200 text-red-800"
                          : "bg-green-200 text-green-800"
                      }`}
                    >
                      {burmeseData
                        ? burmeseData.pyathada === ""
                          ? "No"
                          : "✅ Yes"
                        : "---"}
                    </span>
                  </div>
                </div>

                {/* Nagahle Head */}
                <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg p-3 border border-purple-200">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Nagahle Head:</span>
                    <span className={"font-semibold text-orange-700"}>
                      {burmeseData
                        ? burmeseData.nagahle === ""
                          ? ""
                          : burmeseData.nagahle + " Facing"
                        : "---"}
                    </span>
                  </div>
                </div>
                {/* Mahabote */}
                <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg p-3 border border-blue-200">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Mahabote:</span>
                    <span className={"font-semibold text-orange-700"}>
                      {burmeseData
                        ? burmeseData.mahabote === ""
                          ? ""
                          : burmeseData.mahabote + " Born"
                        : "---"}
                    </span>
                  </div>
                </div>
                {/* Nakhat */}
                <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg p-3 border border-green-200">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Nakhat:</span>
                    <span className={"font-semibold text-orange-700"}>
                      {burmeseData
                        ? burmeseData.nakhat === ""
                          ? ""
                          : burmeseData.nakhat + " Nakhat"
                        : "---"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="mt-6 p-4 bg-gradient-to-r from-amber-100 to-orange-100 rounded-lg border border-amber-300">
              <h5 className="font-semibold text-amber-800 mb-2">
                📚 Cultural Notes
              </h5>
              <p className="text-sm text-amber-700 leading-relaxed">
                The Myanmar calendar is a lunisolar calendar based on the
                Burmese era. Astrological factors like Sabbath, Yatyaza, and
                Pyathada are important for determining auspicious times for
                various activities.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Analytics />
    </>
  );
};

export default App;
