import React from "react";
import moment from "moment";

export default function Loading() {
  const keys = [1, 2, 3]

  return (
    <ul className="list ma0 pa0">
      {
        keys.map(key => (
          <li key={key} className="mb1">
            <div className="db pa2 br2">
              <div className="flex">
                <div className="w2-5 mr2">
                  <div className="bg-black-10 br-100" style={{ width: 40, height: 40 }}></div>
                </div>
                <div className="flex-auto mb1">
                  <span className="db bg-black-10 w-90 pa1 h1 br1 mb1"></span>
                  <time className="db f7 bg-black-10 w-60 h1 br1" dateTime={ moment().format() }></time>
                </div>
              </div>
              <ul className="flex flex-wrap list ml2 f7 fw2">
                <li className="db bg-black-10 white mr1 mb1 br1 w2 h1"></li>
              </ul>
            </div>
          </li>
        ))
      }
    </ul>
  )
}
