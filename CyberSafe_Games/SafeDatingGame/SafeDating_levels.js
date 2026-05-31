//  How to add a new level
//
//  1. Copy one of the level blocks below
//  2. Paste it after the last level (before the closing ]; )
//  3. Fill in all the details
//  4. Add a comma after the level above it
//
//
//  Flag types
//
//  "green"        - safe behaviour.   Green = correct. Red = wrong.
//  "red"          - unsafe behaviour. Red = correct.   Green = wrong.
//  "yellow-red"   - ambiguous, leaning unsafe.
//                   Yellow = correct. Red = close. Green = wrong.
//  "yellow-green" - ambiguous, leaning safe.
//                   Yellow = correct. Green = close. Red = wrong.
//
//
//  Explanation feilds
// 
//  Green and Red levels need:
//    explanation       - shown when the player gets it correct or wrong
//
//  Yellow levels need all three:
//    yellowExplanation - shown when the player picks yellow (correct)
//    closeExplanation  - shown when the player picks the leaning side (close)
//    explanation       - shown when the player picks the opposite side (wrong)
//
//
//  Conversation structure
// 
//  IMPORTANT: To avoid showing two character bubbles in a row,
//  any step that is reached after a choice with a reply
//  must have them: null.
//
//
//  Safe pattern:
//    Step 0: them = "opening message", choices with replies, next: 1
//    Step 1: them = null (reply was their last message),
//            choices with replies, next: 2
//    Step 2: them = null, choices = null (end of conversation)
//
//  Each choice has:
//    text   - what the player says (shown as their chat bubble)
//    reply  - how the character responds to that specific choice
//    next   - which step number to go to



const levels = [


  // ==========================================================
  //  LEVEL 1 - Alex
  //  Scenario : Someone from your workplace
  //  Flag     : Green
  // ==========================================================
  {
    name:    "Alex",
    emoji:   "🦊",
    tagline: "Someone from your workplace",
    flag:    "green",

    conversation: [
      {
        them: "Hey! I think we work in the same building. Found your profile and thought I'd say hi 😊",
        choices: [
          {
            text:  "That's sweet, hi! I think I've seen you around.",
            reply: "Nice! There's a cafe near work if you'd like to meet? No pressure at all.",
            next:  1
          },
          {
            text:  "Oh hey! Which department are you in?",
            reply: "IT, third floor! There's a cafe nearby if you ever fancied coffee? Totally up to you.",
            next:  1
          },
          {
            text:  "Oh! How did you find my profile?",
            reply: "Just came across it on here! Maybe coffee at the cafe near work sometime? No pressure.",
            next:  1
          }
        ]
      },
      {
        them: null,
        choices: [
          {
            text:  "The cafe sounds lovely!",
            reply: "Great! You pick the day, whatever works for you 😊",
            next:  2
          },
          {
            text:  "Maybe next week sometime?",
            reply: "Next week is perfect! Just let me know when you're free.",
            next:  2
          },
          {
            text:  "Let me think about when I'm free!",
            reply: "Of course, no rush at all. Just message whenever 😊",
            next:  2
          }
        ]
      },
      {
        them:    null,
        choices: null
      }
    ],

    explanation: "Alex suggested a public place and let you set the pace. No pressure, no rushing. 🌿"
  },


  // ==========================================================
  //  LEVEL 2 - Jamie
  //  Scenario : A match from a dating app
  //  Flag     : Red
  // ==========================================================
  {
    name:    "Jamie",
    emoji:   "🌸",
    tagline: "A match from a dating app",
    flag:    "red",

    conversation: [
      {
        them: "Your profile stopped me. You seem so different from everyone else on here 💕",
        choices: [
          {
            text:  "That's really sweet, thank you!",
            reply: "I feel a connection already! I'm stuck abroad and my card got blocked. Could you help with flights? I'd pay you back 🙏",
            next:  1
          },
          {
            text:  "Ha, that's a good line!",
            reply: "I mean it, I promise! I'm actually stuck abroad and my card got blocked. Could you help with a flight? I'd pay you back.",
            next:  1
          },
          {
            text:  "I get a lot of messages like that.",
            reply: "But I'm being real! I'm stuck abroad and my card's blocked. Could you help with a flight? I'll pay you back.",
            next:  1
          }
        ]
      },
      {
        them: null,
        choices: [
          {
            text:  "I don't send money to people I haven't met.",
            reply: "Please, just this once. I promise I'm real 🙏",
            next:  2
          },
          {
            text:  "That's a really big ask.",
            reply: "I know. But I promise I'll pay you back the moment I land.",
            next:  2
          },
          {
            text:  "Why can't someone else help you?",
            reply: "I'm embarrassed to ask anyone else. I just feel I can trust you. Please.",
            next:  2
          }
        ]
      },
      {
        them:    null,
        choices: null
      }
    ],

    explanation: "Asking for money before ever meeting is called a romance scam. Never send money to someone you haven't met in person. 🚩"
  },


  // ==========================================================
  //  LEVEL 3 - Sam
  //  Scenario : Someone you've been chatting with for a week
  //  Flag     : Green
  // ==========================================================
  {
    name:    "Sam",
    emoji:   "🌻",
    tagline: "Someone you've been chatting with for a week",
    flag:    "green",

    conversation: [
      {
        them: "We've been chatting a week and you seem great! I always do a video call before meeting. Would that work?",
        choices: [
          {
            text:  "Yes! Great idea, I love that.",
            reply: "Saturday afternoon? Just half an hour to say hi properly.",
            next:  1
          },
          {
            text:  "That works for me.",
            reply: "Saturday afternoon? Short and sweet, and we can plan a proper meet after.",
            next:  1
          },
          {
            text:  "I get a bit nervous about these things.",
            reply: "Me too, that's exactly why I suggest it! Takes the pressure off. Saturday?",
            next:  1
          }
        ]
      },
      {
        them: null,
        choices: [
          {
            text:  "Saturday's perfect!",
            reply: "And if the call goes well, maybe that cafe on the high street? Nice and public.",
            next:  2
          },
          {
            text:  "Could we do Sunday instead?",
            reply: "Sunday works great! Same plan, cafe on the high street after if all goes well.",
            next:  2
          },
          {
            text:  "I'll check and let you know!",
            reply: "No rush! And maybe that cafe on the high street after, if it goes well?",
            next:  2
          }
        ]
      },
      {
        them:    null,
        choices: null
      }
    ],

    explanation: "Sam suggested a video call first, then a busy public place to meet. That is exactly how safe online dating should work. 🌿"
  },


  // ==========================================================
  //  LEVEL 4 - Riley
  //  Scenario : A new match online
  //  Flag     : Red
  // ==========================================================
  {
    name:    "Riley",
    emoji:   "🌙",
    tagline: "A new match online",
    flag:    "red",

    conversation: [
      {
        them: "I know we just matched but I feel like I can really talk to you. Can we keep this between us for now?",
        choices: [
          {
            text:  "That's really lovely to hear.",
            reply: "I'm so glad. Could you send me a photo? Just for me 🌙",
            next:  1
          },
          {
            text:  "Why do you want to keep it secret?",
            reply: "I just want it to feel special before others get involved. Could you send me a photo? Just for me.",
            next:  1
          },
          {
            text:  "This feels quite fast.",
            reply: "I know, I'm sorry. I just feel something real here. Could you send me a photo? Just for me.",
            next:  1
          }
        ]
      },
      {
        them: null,
        choices: [
          {
            text:  "I'm not comfortable sending photos to someone I haven't met.",
            reply: "I'd never share them, I promise. Can't you trust me?",
            next:  2
          },
          {
            text:  "Why do you want to hide this from people?",
            reply: "It's not hiding. I just want to protect what we have. Please.",
            next:  2
          },
          {
            text:  "Something about this doesn't feel right.",
            reply: "I promise I'd never hurt you. Please just trust me 🌙",
            next:  2
          }
        ]
      },
      {
        them:    null,
        choices: null
      }
    ],

    explanation: "Asking you to keep things secret from friends and then asking for private photos are both big warning signs. 🚩"
  },


  // ==========================================================
  //  LEVEL 5 - Marcus
  //  Scenario : Matched two days ago
  //  Flag     : Yellow leaning red
  //             Yellow = correct | Red = close | Green = wrong
  // ==========================================================
  {
    name:    "Marcus",
    emoji:   "😎",
    tagline: "Matched two days ago",
    flag:    "yellow-red",

    conversation: [
      {
        them: "Not one for chatting for weeks. You seem great, let's just meet. I know a bar, Friday night?",
        choices: [
          {
            text:  "I like to get to know someone a bit first.",
            reply: "What's the worst that can happen? It's one drink. Friday if you change your mind.",
            next:  1
          },
          {
            text:  "Could we do a video call first?",
            reply: "I find those awkward honestly. Why not just meet properly?",
            next:  1
          },
          {
            text:  "That's quite soon for me.",
            reply: "Stop overthinking it! It's just a drink. Busy bar, totally safe.",
            next:  1
          }
        ]
      },
      {
        them: null,
        choices: [
          {
            text:  "I'm just not ready to meet yet.",
            reply: "Fair enough. Don't wait too long though. I won't be on here forever.",
            next:  2
          },
          {
            text:  "Maybe. I'll think about it.",
            reply: "That's all I'm asking. Think about it. Could be a great night.",
            next:  2
          },
          {
            text:  "I'd rather not feel rushed.",
            reply: "I'm not rushing you! Life's short. But fine, you know best.",
            next:  2
          }
        ]
      },
      {
        them:    null,
        choices: null
      }
    ],

    yellowExplanation: "Marcus wasn't dangerous but he brushed off your hesitation and avoided the video call idea. How someone handles your boundaries tells you a lot. ⚠️",
    closeExplanation:  "Your instincts were right to feel uneasy. Dismissing your hesitation more than once is a real warning sign. ⚠️",
    explanation:       "Marcus ignored your boundaries and dismissed the video call idea. Someone who respects you will always respect your pace. 🚩"
  },


  // ==========================================================
  //  LEVEL 6 - Priya
  //  Scenario : Matched on an app, been chatting a few days
  //  Flag     : Green
  // ==========================================================
  {
    name:    "Priya",
    emoji:   "🌺",
    tagline: "Matched on an app, been chatting a few days",
    flag:    "green",

    conversation: [
      {
        them: "Hi! I've looked at your profile three times already. The photo at the coast, where was that?? I'm Priya, I talk a lot, fair warning!",
        choices: [
          {
            text:  "Ha hi Priya! It was Cornwall.",
            reply: "CORNWALL! I went two summers ago and I'm still not over it! Did you love it?",
            next:  1
          },
          {
            text:  "I love the energy! It was Cornwall.",
            reply: "Cornwall is just on another level! Was it a holiday? Also your dog in the other photo, I need their name!",
            next:  1
          },
          {
            text:  "Ha, straight to it! It was Cornwall.",
            reply: "Amazing! You seem so fun. I had a feeling. Tell me everything about the dog!",
            next:  1
          }
        ]
      },
      {
        them: null,
        choices: [
          {
            text:  "We should definitely meet up!",
            reply: "Yes! Maybe that market on Saturday? Public, low pressure, we can leave whenever 😊",
            next:  2
          },
          {
            text:  "Would you want to meet up?",
            reply: "I'd love that! The market on Saturday? Busy, easy, zero pressure.",
            next:  2
          },
          {
            text:  "I feel like we'd get on well in person.",
            reply: "Same! The market on Saturday? Nice and public, totally casual. Say yes!",
            next:  2
          }
        ]
      },
      {
        them:    null,
        choices: null
      }
    ],

    explanation: "Priya was open and fun, and suggested somewhere public with no pressure. Being excitable does not mean unsafe! 🌿"
  },


  // ==========================================================
  //  LEVEL 7 - Danny
  //  Scenario : Matched last week, been chatting daily
  //  Flag     : Red
  // ==========================================================
  {
    name:    "Danny",
    emoji:   "😄",
    tagline: "Matched last week, been chatting daily",
    flag:    "red",

    conversation: [
      {
        them: "Confession. I've looked forward to our chat every day this week. You're the funniest person I've matched with. And the best looking, not going to lie!",
        choices: [
          {
            text:  "Ha you're smooth! I've enjoyed it too.",
            reply: "I knew you had good taste! Honestly I'd love to see what you actually look like. Not just the profile pics, you know?",
            next:  1
          },
          {
            text:  "Aw thanks! You've made me laugh too.",
            reply: "Ha! Between us, I'd love to see more of you. The real you, not just the photos. You know what I mean.",
            next:  1
          },
          {
            text:  "I've enjoyed it too. You're funny.",
            reply: "You're sweet! I'll just say it. I'd love to see more of the real you. Too forward?",
            next:  1
          }
        ]
      },
      {
        them: null,
        choices: [
          {
            text:  "I wasn't comfortable with that.",
            reply: "It was just a joke! I thought you had a sense of humour. Most girls would take that as a compliment.",
            next:  2
          },
          {
            text:  "Asking for photos isn't okay.",
            reply: "I wasn't asking for photos! I was just being honest. Forget I said it.",
            next:  2
          },
          {
            text:  "I don't want to talk to someone who says that.",
            reply: "Wow. I say one thing and I'm the bad guy? You're being way too sensitive.",
            next:  2
          }
        ]
      },
      {
        them:    null,
        choices: null
      }
    ],

    explanation: "Danny made an inappropriate request then blamed you for feeling uncomfortable. You are never wrong for setting a boundary. 🚩"
  },


  // ==========================================================
  //  LEVEL 8 - Chris
  //  Scenario : Met on a dating app, first conversation
  //  Flag     : Yellow leaning green
  //             Yellow = correct | Green = close | Red = wrong
  // ==========================================================
  {
    name:    "Chris",
    emoji:   "🍂",
    tagline: "Met on a dating app, first conversation",
    flag:    "yellow-green",

    conversation: [
      {
        them: "Hi! Fair warning, I don't really know how to do this anymore. Was with someone for six years, split up eight months ago. Anyway. Hi. You seem lovely.",
        choices: [
          {
            text:  "Hi! That sounds really tough.",
            reply: "Thank you. I just feel quite lonely if I'm honest. Nice to talk to someone who seems kind.",
            next:  1
          },
          {
            text:  "Hi! I appreciate you being upfront.",
            reply: "No point pretending to be fine! I just feel unusually comfortable talking to you already.",
            next:  1
          },
          {
            text:  "Hi! Eight months isn't long, be kind to yourself.",
            reply: "You're really kind. I just miss feeling like someone sees me, you know? Sorry, heavy for a first chat.",
            next:  1
          }
        ]
      },
      {
        them: null,
        choices: [
          {
            text:  "I'm really glad you reached out.",
            reply: "Me too. I don't want to scare you off. I just feel like I know you already, which I know is a lot.",
            next:  2
          },
          {
            text:  "Let's just take it slowly though.",
            reply: "Of course! Sorry if it's intense. I just find honesty easier than playing it cool.",
            next:  2
          },
          {
            text:  "That is quite a lot for a first chat!",
            reply: "Ha, I know. Working on the filter! I'd really like to keep talking if that's okay.",
            next:  2
          }
        ]
      },
      {
        them:    null,
        choices: null
      }
    ],

    yellowExplanation: "Chris seems genuine but opening up this much in a first chat can sometimes be a way of creating closeness quickly. Being kind and cautious can go together. ⚠️",
    closeExplanation:  "Nothing is obviously wrong, but this level of intensity in a first conversation is worth keeping in mind as you get to know him. ⚠️",
    explanation:       "Fast emotional closeness can sometimes be a way of building trust before pushing boundaries. It is always okay to take your time. ⚠️"
  },


  // ==========================================================
  //  LEVEL 9 - Zoe
  //  Scenario : Matched three days ago, conversation has been great
  //  Flag     : Red
  // ==========================================================
  {
    name:    "Zoe",
    emoji:   "✨",
    tagline: "Matched three days ago, conversation has been great",
    flag:    "red",

    conversation: [
      {
        them: "You mentioned you walk to work. I love that! Whereabouts do you live? Are you central or more on the edges?",
        choices: [
          {
            text:  "Pretty central, near the town centre.",
            reply: "I love that area! Do you work from home much or out most days? I'm trying to picture your routine!",
            next:  1
          },
          {
            text:  "About 20 minutes outside the centre.",
            reply: "Oh nice, more calm then! Are you out a lot or more of a homebody?",
            next:  1
          },
          {
            text:  "Ha, why do you want to know that?",
            reply: "Just nosy! I like picturing where people are. Are you out a lot or more of a homebody?",
            next:  1
          }
        ]
      },
      {
        them: null,
        choices: [
          {
            text:  "I'm out most days.",
            reply: "So are you home alone much in the evenings? I just love knowing what someone's life looks like!",
            next:  2
          },
          {
            text:  "I work from home quite a lot.",
            reply: "Oh so you're home alone quite a bit? I love picturing someone's daily life.",
            next:  2
          },
          {
            text:  "Why are you asking so much about my routine?",
            reply: "Just curious! So do you live alone then? I just think it says so much about a person.",
            next:  2
          }
        ]
      },
      {
        them:    null,
        choices: null
      }
    ],

    explanation: "Zoe's questions seemed friendly but together built a picture of where you live, your routine, and when you're home alone. Always notice patterns like this. 🚩"
  },


  // ==========================================================
  //  LEVEL 10 - Tom
  //  Scenario : Been talking for two weeks, feel like you really know him
  //  Flag     : Yellow leaning red
  //             Yellow = correct | Red = close | Green = wrong
  // ==========================================================
  {
    name:    "Tom",
    emoji:   "🌟",
    tagline: "Been talking for two weeks, feel like you really know him",
    flag:    "yellow-red",

    conversation: [
      {
        them: "Morning! I really want to see you properly. Can we do a video call this week? I feel like I know you so well already.",
        choices: [
          {
            text:  "Yes! I've been wanting to suggest that.",
            reply: "Brilliant. Thursday evening? I really want to make this happen.",
            next:  1
          },
          {
            text:  "I'd love that. How about Thursday?",
            reply: "Thursday could work! I've got a thing that might run late but I'll try my best.",
            next:  1
          },
          {
            text:  "Finally! I was starting to wonder.",
            reply: "Ha, I know. I've been bad at this. Thursday? I'm going to make it happen this time.",
            next:  1
          }
        ]
      },
      {
        them: null,
        choices: [
          {
            text:  "Can't wait!",
            reply: "Thing is work's gone mad this week. Could we say tentatively Thursday and see? I don't want to let you down again.",
            next:  2
          },
          {
            text:  "Looking forward to it!",
            reply: "Work's been crazy honestly. Tentatively Thursday? I really don't want to cancel on you.",
            next:  2
          },
          {
            text:  "This is the third time something has come up.",
            reply: "I know, I'm really sorry. I just get nervous. I don't want to mess up what we have.",
            next:  2
          }
        ]
      },
      {
        them:    null,
        choices: null
      }
    ],

    yellowExplanation: "Two weeks of great chats with no video call, always a new reason, is a pattern worth noticing. It might be nerves, but it is also a common sign of catfishing. ⚠️",
    closeExplanation:  "Your instincts were right. Repeated near-misses on a video call after two weeks is worth paying attention to, even if Tom seems lovely. ⚠️",
    explanation:       "Two weeks of closeness with no video call despite repeated tries is a classic catfishing pattern. You are not wrong to want to actually see someone. 🚩"
  }


  // ----------------------------------------------------------
  //  ADD NEW LEVELS ABOVE THIS LINE
  //  Copy a level block from above, paste it here,
  //  and add a comma after the level before it.
  // ----------------------------------------------------------


];
