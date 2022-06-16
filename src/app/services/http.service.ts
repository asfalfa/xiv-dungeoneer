import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor() { }

  minions = [
    {
      id: 398,
      name: "Wind-up Gaia",
      enhanced_description: "Supposedly discovered by those investigating the Empty, its appearance there is both inexplicable and implausible. Considering all the other unlikely events that occurred there, however, perhaps the sudden materialization of a hammer-wielding mammet is not so unusual after all.",
      patch: "5.4",
      image: "https://ffxivcollect.com/images/minions/large/398.png",
      owned: 	"59%",
      sources: [
        {
          type: "Raid",
          text: "Eden's Promise: Eternity",
          related_type: 'Instance'
        }
      ]
    },
    {
      id: 441,
      name: "Teacup Kapikulu",
      enhanced_description: "Summon your teacup Kapikulu minion. Small but eager to work.",
      patch: "6.1",
      image: "https://ffxivcollect.com/images/minions/large/447.png",
      owned: 	"8.2%",
      sources: [
        {
          type: "Dungeon",
          text: "Alzadaal's Legacy",
          related_type: 'Instance'
        }
      ]
    },
    {
      id: 447,
      name: "Wind-up Azeyma",
      enhanced_description: "Summon your wind-up Azeyma minion. For those who like it scorching hot.",
      patch: "6.1",
      image: "https://ffxivcollect.com/images/minions/large/451.png",
      owned: 	"20%",
      sources: [
        {
          type: "Raid",
          text: "Aglaia",
          related_type: 'Instance'
        }
      ]
    }
  ]

  getMinions(): Array<any> {
    return this.minions;
  }

}
