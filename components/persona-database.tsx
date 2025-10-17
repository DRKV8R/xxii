"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Search, Users, Briefcase, BookOpen, Filter } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Persona data structure
interface Persona {
  id: string
  name: string
  team: string
  occupation: string
  backstory: string
  season: number
}

// Complete persona database from all seasons
const personaDatabase: Persona[] = [
  // Season 1
  {
    id: "s1-1",
    name: "Scotty Palmer",
    team: "Cartoon Voice Actors",
    occupation: "Voice Actor",
    backstory: "Doesn't need much upper-body strength for his job.",
    season: 1,
  },
  {
    id: "s1-2",
    name: "Susan Franks",
    team: "Meat Handlers",
    occupation: "Hot Dog Stuffer",
    backstory: "Vic notes her name is 'very appropriate' for her job.",
    season: 1,
  },
  {
    id: "s1-3",
    name: "Ruby Steamer",
    team: "Cartoon Voice Actors",
    occupation: "Professional Masticator",
    backstory: "Pre-chews meat for the elderly.",
    season: 1,
  },
  {
    id: "s1-4",
    name: "Van Dean",
    team: "Meat Handlers",
    occupation: "Meat Handler",
    backstory: "A proud meat handler and a deacon in his church.",
    season: 1,
  },
  {
    id: "s1-5",
    name: "Larry Mosh",
    team: "Meat Handlers",
    occupation: "Meat Handler",
    backstory: "Neck held together by 10 stitches and gauze.",
    season: 1,
  },
  {
    id: "s1-6",
    name: "Dutch Sparrow",
    team: "Cartoon Voice Actors",
    occupation: "Voice Actor",
    backstory: "Fractured his femur, turning it to 'powder.'",
    season: 1,
  },
  {
    id: "s1-7",
    name: "Her Proctor",
    team: "Meat Handlers",
    occupation: "Meat Handler",
    backstory: "Another 'meat god' who ended up 'loving the boulder.'",
    season: 1,
  },
  {
    id: "s1-8",
    name: "Peter Oldring",
    team: "The Network",
    occupation: "Network Censor",
    backstory: "Enjoys bleeping out curse words; tries to prevent offensive content.",
    season: 1,
  },
  {
    id: "s1-9",
    name: "Ima Turnoff",
    team: "The Network",
    occupation: "Network Executive",
    backstory: "Her main job is cancelling shows and disappointing audiences.",
    season: 1,
  },
  {
    id: "s1-10",
    name: "Al Borland",
    team: "The Cable Company",
    occupation: "Cable Guy",
    backstory: "Claims to have invented the 'scramble-n-descramble' feature.",
    season: 1,
  },
  {
    id: "s1-11",
    name: "Sheila Frankenstein",
    team: "The Cable Company",
    occupation: "Cable Installer",
    backstory: "Known for her 'shocking' personality and messy cable installations.",
    season: 1,
  },
  {
    id: "s1-12",
    name: "Chef Tony",
    team: "Chefs",
    occupation: "TV Chef",
    backstory: "Known for his angry yelling and obsession with fresh ingredients.",
    season: 1,
  },
  {
    id: "s1-13",
    name: "Jeeves",
    team: "Servants",
    occupation: "Butler",
    backstory: "Specializes in polishing his monocle and delivering bad news with a straight face.",
    season: 1,
  },
  {
    id: "s1-14",
    name: "Principal Leg-Burner",
    team: "Educators",
    occupation: "Principal",
    backstory: "Known for his strict disciplinary measures and fiery lectures.",
    season: 1,
  },
  {
    id: "s1-15",
    name: "Sandy Crack",
    team: "Outdoor Enthusiasts",
    occupation: "Geologist",
    backstory: "Specializes in 'tectonic plates' and exploring crevices.",
    season: 1,
  },
  {
    id: "s1-16",
    name: "Forrest Hump",
    team: "Outdoor Enthusiasts",
    occupation: "Park Ranger",
    backstory: "Claims to have been raised by squirrels; often found talking to trees.",
    season: 1,
  },
  {
    id: "s1-17",
    name: "Senator Smirk",
    team: "Politicians",
    occupation: "Senator",
    backstory: "Good at shaking hands and making empty promises.",
    season: 1,
  },
  {
    id: "s1-18",
    name: "Runway Ruby",
    team: "Models",
    occupation: "Fashion Model",
    backstory: "Too skinny to cast a shadow; constantly complaining about the lighting.",
    season: 1,
  },
  {
    id: "s1-19",
    name: "Dr. Feelgood",
    team: "Doctors",
    occupation: "Quack Doctor",
    backstory: "Hands out prescription pads like candy; thinks laughter is the best medicine.",
    season: 1,
  },
  {
    id: "s1-20",
    name: "Lockup Larry",
    team: "Criminals",
    occupation: "Bank Robber",
    backstory: "Wears a cheap plastic mask; easily confused by simple algebra.",
    season: 1,
  },
  {
    id: "s1-21",
    name: "Astro-Naughty",
    team: "Astronauts",
    occupation: "Spacewalker",
    backstory: "Known for his zero-gravity rendezvous; claims to have invented the space wedgie.",
    season: 1,
  },
  {
    id: "s1-22",
    name: "Dusty Trails",
    team: "Cowboys",
    occupation: "Cattle Rustler",
    backstory: "Communicates only through whinnies and yee-haws.",
    season: 1,
  },
  {
    id: "s1-23",
    name: "Metal Mike",
    team: "Rock Stars",
    occupation: "Lead Guitarist",
    backstory: "Has a drinking problem and can only play power chords.",
    season: 1,
  },
  {
    id: "s1-24",
    name: "Sargeant Snarler",
    team: "The Army",
    occupation: "Drill Instructor",
    backstory: "Yells at squirrels for not maintaining proper formation.",
    season: 1,
  },
  {
    id: "s1-25",
    name: "Plunger Phil",
    team: "Plumbers",
    occupation: "Plumber",
    backstory: "Thinks he's a doctor because he spends his day operating on pipes.",
    season: 1,
  },
  {
    id: "s1-26",
    name: "Nurse Naughty",
    team: "Nurses",
    occupation: "Registered Nurse",
    backstory: "Her stethoscope is only for dramatic effect; notorious for flirting.",
    season: 1,
  },

  // Season 2
  {
    id: "s2-1",
    name: "Willie Evermakeit",
    team: "Addicts",
    occupation: "Gambling Addict",
    backstory: "Bet his own spleen on a horse race and lost.",
    season: 2,
  },
  {
    id: "s2-2",
    name: "Phil Anthropist",
    team: "Donors",
    occupation: "Blood Donor",
    backstory: "Has donated over 50 gallons of blood; believes in giving back.",
    season: 2,
  },
  {
    id: "s2-3",
    name: "Robin Banks",
    team: "Donors",
    occupation: "Sperm Donor",
    backstory: "Has fathered over 200 children; known as 'The Baby Maker.'",
    season: 2,
  },
  {
    id: "s2-4",
    name: "Candy Striper",
    team: "Addicts",
    occupation: "Sugar Addict",
    backstory: "Once ate a 5-pound bag of sugar in one sitting.",
    season: 2,
  },
  {
    id: "s2-5",
    name: "Officer Donut",
    team: "Cops",
    occupation: "Police Officer",
    backstory: "His favorite part of the job is the free donuts.",
    season: 2,
  },
  {
    id: "s2-6",
    name: "Jimmy 'The Shiv'",
    team: "Cons",
    occupation: "Inmate",
    backstory: "An expert at making weapons out of toothbrushes.",
    season: 2,
  },
  {
    id: "s2-7",
    name: "Warden Willis",
    team: "Cops",
    occupation: "Prison Warden",
    backstory: "Enjoys long walks on the beach and cavity searches.",
    season: 2,
  },
  {
    id: "s2-8",
    name: "Thigh-Master Tony",
    team: "Fitness",
    occupation: "Aerobics Instructor",
    backstory: "Wears leg warmers and believes the 80s never ended.",
    season: 2,
  },
  {
    id: "s2-9",
    name: "The Human Couch",
    team: "Obesity",
    occupation: "Competitive Eater",
    backstory: "Capable of consuming an entire buffet; loves snacks.",
    season: 2,
  },
  {
    id: "s2-10",
    name: "General Disorder",
    team: "Military",
    occupation: "Army General",
    backstory: "Yells at everything; runs his life like a boot camp.",
    season: 2,
  },
  {
    id: "s2-11",
    name: "Patchouli Pete",
    team: "Hippies",
    occupation: "Activist",
    backstory: "Protests everything from war to the color green; smells strongly of essential oils.",
    season: 2,
  },
  {
    id: "s2-12",
    name: "Realtor Rhonda",
    team: "Real Estate",
    occupation: "Broker",
    backstory: "Attempts to sell the MXC course before every run.",
    season: 2,
  },
  {
    id: "s2-13",
    name: "Investor Ivy",
    team: "Bankers",
    occupation: "Stock Analyst",
    backstory: "Only interested in contestants with a high ROI (Return On Injury).",
    season: 2,
  },
  {
    id: "s2-14",
    name: "Mad Scientist Mildred",
    team: "Scientists",
    occupation: "Biologist",
    backstory: "Attempts to take a mud sample mid-run for DNA testing.",
    season: 2,
  },
  {
    id: "s2-15",
    name: "Carpenter Charlie",
    team: "Carpenters",
    occupation: "Carpenter",
    backstory: "Stops to measure the dimensions of the obstacles, muttering about poor craftsmanship.",
    season: 2,
  },
  {
    id: "s2-16",
    name: "Cheerleader Tiffany",
    team: "Cheerleaders",
    occupation: "Cheerleader",
    backstory: "Always has a ponytail; obsessed with school spirit and pep rallies.",
    season: 2,
  },
  {
    id: "s2-17",
    name: "Goth Penelope",
    team: "Goth Kids",
    occupation: "High School Student",
    backstory: "Complains about the agony of existence; wears excessive black makeup.",
    season: 2,
  },

  // Season 3
  {
    id: "s3-1",
    name: "Press Secretary Pam",
    team: "White House",
    occupation: "Press Secretary",
    backstory: "An expert 'spin doctor'; can deny being present even when standing directly in front of you.",
    season: 3,
  },
  {
    id: "s3-2",
    name: "Bob The Builder",
    team: "Blue Collar",
    occupation: "Construction Worker",
    backstory: "Despite the name, he can't fix anything; spends most of his time leaning on his shovel.",
    season: 3,
  },
  {
    id: "s3-3",
    name: "Stump",
    team: "Republicans",
    occupation: "Politician",
    backstory: "Known for his 'flip-flopping' on key issues and confusing rhetoric.",
    season: 3,
  },
  {
    id: "s3-4",
    name: "Kennedy",
    team: "Democrats",
    occupation: "Politician",
    backstory: "Comes from a 'long line of politically-motivated swimmers.'",
    season: 3,
  },
  {
    id: "s3-5",
    name: "Babaganoush",
    team: "Unemployed",
    occupation: "Pleasure Giver",
    backstory: "Gives 110% to pleasure; three-time 'fastest typist in the world.'",
    season: 3,
  },
  {
    id: "s3-6",
    name: "Tree Hugger",
    team: "Environmentalists",
    occupation: "Activist",
    backstory: "Once chained himself to a Redwood for a week; speaks fluent 'tree.'",
    season: 3,
  },
  {
    id: "s3-7",
    name: "Lunch Lady Doris",
    team: "High School",
    occupation: "School Cook",
    backstory: "Famous for her mystery meat and her hair net; knows all the school gossip.",
    season: 3,
  },
  {
    id: "s3-8",
    name: "Retiree Ruth",
    team: "Retirement Home",
    occupation: "Retiree",
    backstory: "Complains about the loud music and her hip replacement.",
    season: 3,
  },
  {
    id: "s3-9",
    name: "Don 'The Mouth'",
    team: "Organized Crime",
    occupation: "Mob Boss",
    backstory: "Known for making offers people can't refuse; has a very 'persuasive' demeanor.",
    season: 3,
  },
  {
    id: "s3-10",
    name: "Jenny 'The Scale'",
    team: "Weight Loss Industry",
    occupation: "Diet Guru",
    backstory: "Lost 200 pounds on a diet of rice cakes and sadness.",
    season: 3,
  },
  {
    id: "s3-11",
    name: "Judge Mental",
    team: "Litigious",
    occupation: "Traffic Court Judge",
    backstory: "Known for handing out maximum sentences for parking violations.",
    season: 3,
  },
  {
    id: "s3-12",
    name: "Sue Happy",
    team: "Litigious",
    occupation: "Professional Plaintiff",
    backstory: "Once sued herself for emotional distress and won.",
    season: 3,
  },
  {
    id: "s3-13",
    name: "Slick",
    team: "Oil Industry",
    occupation: "Oil Tycoon",
    backstory: "His blood is 80% crude oil; dreams of drilling in national parks.",
    season: 3,
  },
  {
    id: "s3-14",
    name: "Fabrice",
    team: "Make-Over Industry",
    occupation: "Stylist",
    backstory: "Believes there is 'no ugly, only lazy'; critiques everyone's wardrobe.",
    season: 3,
  },
  {
    id: "s3-15",
    name: "Diaper Dan",
    team: "Baby Products",
    occupation: "Diaper Tester",
    backstory: "Claims to have the most absorbent job in the world.",
    season: 3,
  },
  {
    id: "s3-16",
    name: "C.S.I. Miami",
    team: "Forensics",
    occupation: "Crime Scene Investigator",
    backstory: "Never takes off his sunglasses, even in the dark.",
    season: 3,
  },

  // Season 4
  {
    id: "s4-1",
    name: "Kirsten Miller",
    team: "Desperate Housewives",
    occupation: "Mother",
    backstory: "Served 60 days in county jail for 'spousal maintenance.'",
    season: 4,
  },
  {
    id: "s4-2",
    name: "Dr. Robert Darnell",
    team: "Ultimate Fighters",
    occupation: "Fighter / Dentist",
    backstory: "Volunteers for the local tooth fairy.",
    season: 4,
  },
  {
    id: "s4-3",
    name: "Burt Stark",
    team: "Ultimate Fighters",
    occupation: "Fighter / Inventor",
    backstory: "Inventor of the 'Rectal Shaver.'",
    season: 4,
  },
  {
    id: "s4-4",
    name: "Rocky Marciano",
    team: "Ultimate Fighters",
    occupation: "Boxer",
    backstory: "Fights naked and has had 16 wives.",
    season: 4,
  },
  {
    id: "s4-5",
    name: "Misty Love",
    team: "Desperate Housewives",
    occupation: "Homemaker",
    backstory: "An adult film star turned mom who now has to do her own dishes.",
    season: 4,
  },
  {
    id: "s4-6",
    name: "Bull Market",
    team: "Wall Street",
    occupation: "Stockbroker",
    backstory: "Sold his grandmother's hip replacement to buy tech stocks.",
    season: 4,
  },
  {
    id: "s4-7",
    name: "Anita Drink",
    team: "Alcohol Industry",
    occupation: "Bartender",
    backstory: "Can mix a martini with one hand while calling a cab with the other.",
    season: 4,
  },
  {
    id: "s4-8",
    name: "Bubba Galore",
    team: "Country Music",
    occupation: "Line Dancer",
    backstory: "Holds the world record for the longest 'Achy Breaky Heart.'",
    season: 4,
  },
  {
    id: "s4-9",
    name: "Agent 00-Zero",
    team: "James Bond",
    occupation: "Spy",
    backstory: "Has a license to spill; known for blowing his own cover.",
    season: 4,
  },
  {
    id: "s4-10",
    name: "Tammy Wynette-Not",
    team: "Country Music",
    occupation: "Singer",
    backstory: "Only sings songs about her truck, her dog, and her ex-husband.",
    season: 4,
  },
  {
    id: "s4-11",
    name: "Hacker Hank",
    team: "Computer Nerds",
    occupation: "Programmer",
    backstory: "Lives in his mom's basement; uses a VPN for everything.",
    season: 4,
  },
  {
    id: "s4-12",
    name: "Garden Gnome Gary",
    team: "Gardeners",
    occupation: "Gardener",
    backstory: "Wears a pointy hat; spends more time talking to flowers than to people.",
    season: 4,
  },
  {
    id: "s4-13",
    name: "Slots McGinty",
    team: "Gamblers",
    occupation: "Slot Machine Enthusiast",
    backstory: "Has a callous on his finger the size of a quarter from pulling levers.",
    season: 4,
  },
  {
    id: "s4-14",
    name: "Keg Stand Ken",
    team: "Drinkers",
    occupation: "Frat boy for life",
    backstory: "Majored in beer pong and minored in passing out.",
    season: 4,
  },
  {
    id: "s4-15",
    name: "Chef Gordon",
    team: "Chefs",
    occupation: "Head Chef (Parody)",
    backstory: "Swears profusely at the challenges; calls every failed contestant an 'idiot sandwich.'",
    season: 4,
  },
  {
    id: "s4-16",
    name: "Dr. Fill",
    team: "Dentists",
    occupation: "Dentist",
    backstory: "Insists on flossing before every challenge; believes the log drop is 'good for the jaw alignment.'",
    season: 4,
  },

  // Season 5
  {
    id: "s5-1",
    name: "Holy Roller",
    team: "Religious",
    occupation: "Preacher",
    backstory: "Speaks in tongues, mostly when ordering fast food.",
    season: 5,
  },
  {
    id: "s5-2",
    name: "Godless Gary",
    team: "Atheists",
    occupation: "Skeptic",
    backstory: "Doesn't believe in anything, including gravity.",
    season: 5,
  },
  {
    id: "s5-3",
    name: "Farmer McGregor",
    team: "The Farm",
    occupation: "Farmer",
    backstory: "Always wears overalls; smells distinctly of manure and fresh hay.",
    season: 5,
  },
  {
    id: "s5-4",
    name: "Yuppie Paul",
    team: "The City",
    occupation: "Urban Professional",
    backstory: "Complains about the lack of organic lattes and reliable WiFi.",
    season: 5,
  },
  {
    id: "s5-5",
    name: "Buffy Windsor",
    team: "High Society",
    occupation: "Heiress",
    backstory: "Has never tied her own shoes; has a servant for that.",
    season: 5,
  },
  {
    id: "s5-6",
    name: "Joe Sixpack",
    team: "The Hoy Poloy",
    occupation: "Plumber",
    backstory: "His butt-crack is famous in three counties.",
    season: 5,
  },
  {
    id: "s5-7",
    name: "Chef Boy-Are-We-Full",
    team: "Food Industry",
    occupation: "Celebrity Chef",
    backstory: "Known for his butter sculptures and an appetite that could rival a sumo wrestler.",
    season: 5,
  },
  {
    id: "s5-8",
    name: "Jane Fonda-The-Cash",
    team: "Fitness",
    occupation: "Aerobics Instructor",
    backstory: "Her VHS tapes caused more knee injuries than a demolition derby.",
    season: 5,
  },
  {
    id: "s5-9",
    name: "Sensei Pain",
    team: "Martial Arts",
    occupation: "Karate Instructor",
    backstory: "Believes his only weakness is a bad pizza; communicates with chop motions.",
    season: 5,
  },
  {
    id: "s5-10",
    name: "Randy 'The Ropes'",
    team: "Wrestling",
    occupation: "Professional Wrestler",
    backstory: "His catchphrase is 'Can you smell what The Ropes is cooking?'; constantly adjusting his spandex.",
    season: 5,
  },
  {
    id: "s5-11",
    name: "Sal Manilla",
    team: "Industry",
    occupation: "Factory Worker",
    backstory: "Once filed a grievance because the coffee was 'too hot.'",
    season: 5,
  },
  {
    id: "s5-12",
    name: "Mr. Pinkslip",
    team: "Management",
    occupation: "CEO",
    backstory: "His hobbies include downsizing and outsourcing; his yacht is named 'The Layoff.'",
    season: 5,
  },
  {
    id: "s5-13",
    name: "Senator Sockpuppet",
    team: "Politicians",
    occupation: "Senator",
    backstory: "Knows how to shake a baby and kiss a hand in a 3-second window.",
    season: 5,
  },
  {
    id: "s5-14",
    name: "Crazy Carl",
    team: "People Who Should Be Locked Up",
    occupation: "Local Nuisance",
    backstory: "Believes pigeons are government spies; often found yelling at stop signs.",
    season: 5,
  },
  {
    id: "s5-15",
    name: "Captain Obvious",
    team: "Superheroes",
    occupation: "Hero",
    backstory: "His superpower is pointing out things everyone already knows.",
    season: 5,
  },
  {
    id: "s5-16",
    name: "Dr. Evil",
    team: "Villains",
    occupation: "Mastermind",
    backstory: "Demands a ransom of... one million dollars.",
    season: 5,
  },
  {
    id: "s5-17",
    name: "Captain Kirk-Off",
    team: "Sci-Fi",
    occupation: "Starship Captain",
    backstory: "Only communicates in overly dramatic pauses and cheesy wrestling moves.",
    season: 5,
  },
  {
    id: "s5-18",
    name: "Gandalf The Grey-Hair",
    team: "Fantasy",
    occupation: "Wizard",
    backstory: "Keeps yelling 'You shall not pass!' but often trips on his own staff.",
    season: 5,
  },
]

export default function PersonaDatabase() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSeason, setSelectedSeason] = useState<string>("all")
  const [selectedTeam, setSelectedTeam] = useState<string>("all")
  const [selectedPersona, setSelectedPersona] = useState<Persona | null>(null)

  // Extract unique teams and seasons
  const teams = useMemo(() => {
    const uniqueTeams = Array.from(new Set(personaDatabase.map((p) => p.team)))
    return uniqueTeams.sort()
  }, [])

  const seasons = [1, 2, 3, 4, 5]

  // Filter personas based on search and filters
  const filteredPersonas = useMemo(() => {
    return personaDatabase.filter((persona) => {
      const matchesSearch =
        persona.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        persona.occupation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        persona.backstory.toLowerCase().includes(searchQuery.toLowerCase()) ||
        persona.team.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesSeason = selectedSeason === "all" || persona.season === Number.parseInt(selectedSeason)
      const matchesTeam = selectedTeam === "all" || persona.team === selectedTeam

      return matchesSearch && matchesSeason && matchesTeam
    })
  }, [searchQuery, selectedSeason, selectedTeam])

  // Get statistics
  const stats = useMemo(() => {
    return {
      total: personaDatabase.length,
      teams: teams.length,
      seasons: seasons.length,
      filtered: filteredPersonas.length,
    }
  }, [filteredPersonas.length, teams.length])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            Persona Database
          </h1>
          <p className="text-slate-400 text-lg">Building the legends behind the profiles</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-slate-900/50 border-cyan-500/20 backdrop-blur">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-400 flex items-center gap-2">
                <Users className="h-4 w-4" />
                Total Personas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-cyan-400">{stats.total}</div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-blue-500/20 backdrop-blur">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-400 flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                Unique Teams
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-400">{stats.teams}</div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-purple-500/20 backdrop-blur">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-400 flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Seasons
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-400">{stats.seasons}</div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-emerald-500/20 backdrop-blur">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-400 flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filtered Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-emerald-400">{stats.filtered}</div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-slate-200">Search & Filter</CardTitle>
            <CardDescription className="text-slate-400">
              Find personas by name, occupation, team, or backstory
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search personas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-slate-800/50 border-slate-700 text-slate-200 placeholder:text-slate-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm text-slate-400">Season</label>
                <Select value={selectedSeason} onValueChange={setSelectedSeason}>
                  <SelectTrigger className="bg-slate-800/50 border-slate-700 text-slate-200">
                    <SelectValue placeholder="All Seasons" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="all">All Seasons</SelectItem>
                    {seasons.map((season) => (
                      <SelectItem key={season} value={season.toString()}>
                        Season {season}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-slate-400">Team</label>
                <Select value={selectedTeam} onValueChange={setSelectedTeam}>
                  <SelectTrigger className="bg-slate-800/50 border-slate-700 text-slate-200">
                    <SelectValue placeholder="All Teams" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700 max-h-[300px]">
                    <SelectItem value="all">All Teams</SelectItem>
                    {teams.map((team) => (
                      <SelectItem key={team} value={team}>
                        {team}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {(searchQuery || selectedSeason !== "all" || selectedTeam !== "all") && (
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("")
                  setSelectedSeason("all")
                  setSelectedTeam("all")
                }}
                className="w-full border-slate-700 text-slate-300 hover:bg-slate-800"
              >
                Clear Filters
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Persona Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPersonas.map((persona) => (
            <Card
              key={persona.id}
              className="bg-slate-900/50 border-slate-700/50 backdrop-blur hover:border-cyan-500/50 transition-all cursor-pointer group"
              onClick={() => setSelectedPersona(persona)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1 flex-1">
                    <CardTitle className="text-lg text-slate-200 group-hover:text-cyan-400 transition-colors">
                      {persona.name}
                    </CardTitle>
                    <CardDescription className="text-slate-400">{persona.occupation}</CardDescription>
                  </div>
                  <Badge variant="outline" className="border-blue-500/50 text-blue-400 text-xs">
                    S{persona.season}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <Badge variant="secondary" className="bg-slate-800 text-slate-300 text-xs">
                    {persona.team}
                  </Badge>
                </div>
                <p className="text-sm text-slate-400 line-clamp-2">{persona.backstory}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPersonas.length === 0 && (
          <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur">
            <CardContent className="py-12 text-center">
              <p className="text-slate-400 text-lg">No personas found matching your criteria</p>
              <p className="text-slate-500 text-sm mt-2">Try adjusting your search or filters</p>
            </CardContent>
          </Card>
        )}

        {/* Detailed Persona Modal */}
        {selectedPersona && (
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            onClick={() => setSelectedPersona(null)}
          >
            <Card className="bg-slate-900 border-cyan-500/50 max-w-2xl w-full" onClick={(e) => e.stopPropagation()}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="text-3xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                      {selectedPersona.name}
                    </CardTitle>
                    <CardDescription className="text-lg text-slate-300">{selectedPersona.occupation}</CardDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedPersona(null)}
                    className="text-slate-400 hover:text-slate-200"
                  >
                    ✕
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex gap-3">
                  <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/50">
                    Season {selectedPersona.season}
                  </Badge>
                  <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/50">
                    {selectedPersona.team}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wide">Backstory</h3>
                  <p className="text-slate-300 text-lg leading-relaxed">{selectedPersona.backstory}</p>
                </div>

                <div className="pt-4 border-t border-slate-700">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-slate-500">Persona ID:</span>
                      <span className="text-slate-300 ml-2 font-mono">{selectedPersona.id}</span>
                    </div>
                    <div>
                      <span className="text-slate-500">Vector Status:</span>
                      <span className="text-emerald-400 ml-2">✓ Indexed</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
