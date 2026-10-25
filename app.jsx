```react
import React, { useState } from 'react';
import { 
  ShoppingBag, 
  BookOpen, 
  CheckCircle2, 
  Circle, 
  ChefHat, 
  Calendar, 
  Users,
  User,
  Heart,
  Settings,
  Utensils,
  Flame,
  Clock,
  Check
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('preferences');

  // Initializing Mon-Fri Presence State for both Chef and Liz across 3 meals
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  const meals = ['Breakfast', 'Lunch', 'Dinner'];
  
  const initialPresence = days.reduce((acc, day) => {
    acc[day] = {
      Breakfast: { chef: true, liz: true },
      Lunch: { chef: true, liz: true },
      Dinner: { chef: true, liz: true }
    };
    return acc;
  }, {});

  const [presence, setPresence] = useState(initialPresence);
  const [includeSundries, setIncludeSundries] = useState(false);
  const [highFiberBoost, setHighFiberBoost] = useState(true);
  const [completedMeals, setCompletedMeals] = useState({});
  const [checkedList, setCheckedList] = useState({});

  // Fixed Meal Plan Mapping
  const mealPlan = {
    Mon: { Breakfast: 'Skyr Berries Bowl', Lunch: 'Harissa Chicken Wraps', Dinner: 'Pan-Seared Salmon & Potato' },
    Tue: { Breakfast: 'Skyr Berries Bowl', Lunch: 'Harissa Chicken Wraps', Dinner: 'Pan-Seared Salmon & Potato' },
    Wed: { Breakfast: 'Skyr Berries Bowl', Lunch: 'Harissa Chicken Wraps', Dinner: 'Beef & Black Bean Chili' },
    Thu: { Breakfast: 'Skyr Berries Bowl', Lunch: 'Beef & Black Bean Chili', Dinner: 'Beef & Black Bean Chili' },
    Fri: { Breakfast: 'Skyr Berries Bowl', Lunch: 'Beef & Black Bean Chili', Dinner: 'Beef & Black Bean Chili' },
  };

  // Base Shopping List (£53.55)
  const baseShoppingList = [
    { id: '1', category: 'Meat & Fish', name: 'Birchwood Chicken Thighs (1.8kg)', price: 11.98 },
    { id: '2', category: 'Meat & Fish', name: 'Birchwood 5% Beef Mince (750g)', price: 5.19 },
    { id: '3', category: 'Meat & Fish', name: 'Lighthouse Bay Salmon (240g)', price: 3.29 },
    { id: '4', category: 'Dairy', name: 'Milbona High Protein Skyr (1kg)', price: 1.85 },
    { id: '5', category: 'Produce', name: 'Green Grocer Frozen Berries (1kg)', price: 2.79 },
    { id: '6', category: 'Produce', name: 'Oaklands Sweet Potatoes (1kg)', price: 0.99 },
    { id: '7', category: 'Produce', name: 'Oaklands Baking Potatoes (4-pack)', price: 0.75 },
    { id: '8', category: 'Produce', name: 'Peppers, Courgettes, Mushrooms', price: 2.80 },
    { id: '9', category: 'Produce', name: 'Fresh Spinach & Broccoli', price: 1.93 },
    { id: '10', category: 'Produce', name: 'Red Onions & Garlic', price: 1.15 },
    { id: '11', category: 'Produce', name: 'Lemons & Fresh Herbs', price: 1.60 },
    { id: '12', category: 'Pantry', name: 'Campo Largo Beans (4 tins)', price: 2.00 },
    { id: '13', category: 'Pantry', name: 'Baresa Chopped Tomatoes (3 tins)', price: 1.17 },
    { id: '14', category: 'Pantry', name: 'Crownfield Chia & Flaxseed', price: 2.20 },
    { id: '15', category: 'Pantry', name: 'Harissa Paste & Stock Cubes', price: 2.00 }
  ];

  // Dynamic Shopping List
  const shoppingList = [...baseShoppingList];
  if (includeSundries) {
    shoppingList.push({ id: 'sundries', category: 'Pantry', name: 'Baresa Sun-Dried Tomatoes in Oil', price: 1.45 });
  }

  const currentTotal = shoppingList.reduce((sum, item) => sum + item.price, 0);

  // Toggle meal completion
  const toggleMealComplete = (day, meal) => {
    const key = `${day}-${meal}`;
    setCompletedMeals(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Toggle presence
  const togglePresence = (day, meal, person) => {
    setPresence(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [meal]: {
          ...prev[day][meal],
          [person]: !prev[day][meal][person]
        }
      }
    }));
  };

  // Toggle shopping list item
  const toggleShoppingItem = (id) => {
    setCheckedList(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const getOwnerTag = (day, meal) => {
    const status = presence[day][meal];
    if (status.chef && status.liz) return { label: "Ours", color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30", icon: Users };
    if (status.chef) return { label: "Mine", color: "bg-amber-500/20 text-amber-400 border-amber-500/30", icon: User };
    if (status.liz) return { label: "Liz's", color: "bg-rose-500/20 text-rose-400 border-rose-500/30", icon: Heart };
    return null; // Neither is present
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-24">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur border-b border-slate-800 px-4 py-4 shadow-md">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl text-slate-900 shadow-lg shadow-amber-500/20">
              <ChefHat size={22} className="stroke-[2.5]" />
            </div>
            <div>
              <h1 className="font-bold text-lg tracking-tight">Chef & Liz Prep</h1>
              <p className="text-xs text-slate-400 font-medium tracking-wide">~2000 kcal • High Protein • High Fiber</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        {/* Navigation */}
        <div className="flex bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800/80 mb-8 overflow-x-auto shadow-inner">
          {[
            { id: 'preferences', icon: Settings, label: 'Presence' },
            { id: 'schedule', icon: Calendar, label: 'Schedule' },
            { id: 'shopping', icon: ShoppingBag, label: 'Lidl List' },
            { id: 'recipes', icon: BookOpen, label: 'Recipes' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                activeTab === tab.id 
                  ? 'bg-slate-800 text-amber-400 shadow-md border border-slate-700/50' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* --- TAB 1: PREFERENCES & PRESENCE --- */}
        {activeTab === 'preferences' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="bg-gradient-to-br from-slate-900 to-slate-800/50 rounded-2xl border border-slate-800 p-5 shadow-lg">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Settings className="text-amber-400" size={20} /> Pantry Add-ons
              </h2>
              
              <div className="space-y-3">
                <label className="flex items-center justify-between cursor-pointer group bg-slate-950/50 p-4 rounded-xl border border-slate-800/50 hover:border-slate-700 transition">
                  <div className="flex flex-col">
                    <span className="font-semibold text-slate-200 group-hover:text-white transition">Baresa Sun-Dried Tomatoes</span>
                    <span className="text-xs text-slate-500">In herb oil (£1.45 at Lidl)</span>
                  </div>
                  <div className={`w-12 h-6 rounded-full transition-colors relative flex items-center ${includeSundries ? 'bg-amber-500' : 'bg-slate-700'}`}>
                    <div className={`w-4 h-4 bg-white rounded-full shadow-sm absolute transition-transform duration-200 ${includeSundries ? 'translate-x-7' : 'translate-x-1'}`} />
                  </div>
                  <input type="checkbox" className="hidden" checked={includeSundries} onChange={() => setIncludeSundries(!includeSundries)} />
                </label>

                <label className="flex items-center justify-between cursor-pointer group bg-slate-950/50 p-4 rounded-xl border border-slate-800/50 hover:border-slate-700 transition">
                  <div className="flex flex-col">
                    <span className="font-semibold text-slate-200 group-hover:text-white transition">High-Fiber Boost</span>
                    <span className="text-xs text-slate-500">Extra Chia & Flaxseeds (~8g extra fiber)</span>
                  </div>
                  <div className={`w-12 h-6 rounded-full transition-colors relative flex items-center ${highFiberBoost ? 'bg-amber-500' : 'bg-slate-700'}`}>
                    <div className={`w-4 h-4 bg-white rounded-full shadow-sm absolute transition-transform duration-200 ${highFiberBoost ? 'translate-x-7' : 'translate-x-1'}`} />
                  </div>
                  <input type="checkbox" className="hidden" checked={highFiberBoost} onChange={() => setHighFiberBoost(!highFiberBoost)} />
                </label>
              </div>
            </div>

            <div className="bg-gradient-to-br from-slate-900 to-slate-800/50 rounded-2xl border border-slate-800 p-5 shadow-lg">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Users className="text-amber-400" size={20} /> Weekly Presence
              </h2>
              <p className="text-sm text-slate-400 mb-6">Toggle who is eating at home for each meal. The schedule will update tags automatically.</p>
              
              <div className="space-y-6">
                {days.map(day => (
                  <div key={day} className="bg-slate-950/50 rounded-xl p-4 border border-slate-800/50">
                    <h3 className="font-bold text-amber-500 mb-3 uppercase tracking-wider text-sm">{day}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {meals.map(meal => (
                        <div key={`${day}-${meal}`} className="bg-slate-900 p-3 rounded-lg border border-slate-800 flex flex-col gap-2">
                          <span className="text-xs font-semibold text-slate-400">{meal}</span>
                          <div className="flex gap-2">
                            <button 
                              onClick={() => togglePresence(day, meal, 'chef')}
                              className={`flex-1 py-1.5 rounded text-xs font-bold transition flex items-center justify-center gap-1 ${presence[day][meal].chef ? 'bg-amber-500 text-slate-900 shadow-sm' : 'bg-slate-800 text-slate-500 hover:bg-slate-700'}`}
                            >
                              {presence[day][meal].chef && <Check size={12} />} Chef
                            </button>
                            <button 
                              onClick={() => togglePresence(day, meal, 'liz')}
                              className={`flex-1 py-1.5 rounded text-xs font-bold transition flex items-center justify-center gap-1 ${presence[day][meal].liz ? 'bg-rose-500 text-white shadow-sm' : 'bg-slate-800 text-slate-500 hover:bg-slate-700'}`}
                            >
                              {presence[day][meal].liz && <Check size={12} />} Liz
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* --- TAB 2: SCHEDULE --- */}
        {activeTab === 'schedule' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {days.map(day => {
              // Check if any meal is active today
              const hasMeals = meals.some(m => presence[day][m].chef || presence[day][m].liz);
              if (!hasMeals) return null;

              return (
                <div key={day} className="bg-slate-900 rounded-2xl border border-slate-800 p-1 shadow-lg">
                  <div className="bg-slate-950/50 px-4 py-3 border-b border-slate-800 rounded-t-xl">
                    <h3 className="font-bold text-lg text-amber-400">{day}</h3>
                  </div>
                  <div className="p-2 space-y-2">
                    {meals.map(meal => {
                      const tag = getOwnerTag(day, meal);
                      if (!tag) return null; // Skipped if no one is eating
                      
                      const isCompleted = completedMeals[`${day}-${meal}`];
                      const TagIcon = tag.icon;

                      return (
                        <div 
                          key={`${day}-${meal}`}
                          onClick={() => toggleMealComplete(day, meal)}
                          className={`flex items-center p-3 rounded-xl border transition-all cursor-pointer ${isCompleted ? 'bg-slate-800/30 border-slate-800 opacity-60' : 'bg-slate-800/80 border-slate-700 hover:border-slate-600 shadow-sm'}`}
                        >
                          <div className="flex-1 flex flex-col gap-1.5">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{meal}</span>
                              {/* Safely closed template literal below */}
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 border ${tag.color}`}>
                                <TagIcon size={10} /> {tag.label}
                              </span>
                            </div>
                            <span className={`font-semibold text-[15px] ${isCompleted ? 'line-through text-slate-500' : 'text-slate-100'}`}>
                              {mealPlan[day][meal]}
                            </span>
                          </div>
                          <div className="pl-3">
                            {isCompleted ? (
                              <CheckCircle2 className="text-emerald-500" size={24} />
                            ) : (
                              <Circle className="text-slate-600" size={24} />
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* --- TAB 3: SHOPPING LIST --- */}
        {activeTab === 'shopping' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Budget Tracker */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-800 p-5 rounded-2xl shadow-lg relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-slate-800">
                <div 
                  className={`h-full transition-all duration-500 ${currentTotal > 60 ? 'bg-rose-500' : 'bg-amber-500'}`} 
                  style={{ width: `${Math.min((currentTotal / 60) * 100, 100)}%` }}
                />
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-slate-400 text-sm font-semibold mb-1">Lidl Budget Tracker</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-white">£{currentTotal.toFixed(2)}</span>
                    <span className="text-slate-500 font-medium">/ £60.00</span>
                  </div>
                </div>
                <div className={`px-3 py-1.5 rounded-lg text-xs font-bold ${currentTotal <= 60 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
                  {currentTotal <= 60 ? 'Under Budget' : 'Over Budget'}
                </div>
              </div>
            </div>

            {/* List Grouped by Category */}
            {['Meat & Fish', 'Produce', 'Dairy', 'Pantry'].map(category => {
              const items = shoppingList.filter(i => i.category === category);
              if (items.length === 0) return null;

              return (
                <div key={category} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-md">
                  <div className="bg-slate-950/50 px-4 py-2 border-b border-slate-800">
                    <h3 className="font-bold text-amber-500 text-sm tracking-wide">{category}</h3>
                  </div>
                  <div className="divide-y divide-slate-800/50">
                    {items.map(item => (
                      <div 
                        key={item.id} 
                        onClick={() => toggleShoppingItem(item.id)}
                        className={`flex items-center justify-between p-4 cursor-pointer transition-colors hover:bg-slate-800/30 ${checkedList[item.id] ? 'opacity-50' : ''}`}
                      >
                        <div className="flex items-center gap-3">
                          {checkedList[item.id] ? (
                            <CheckCircle2 className="text-amber-500 shrink-0" size={20} />
                          ) : (
                            <Circle className="text-slate-600 shrink-0" size={20} />
                          )}
                          <span className={`text-sm font-medium ${checkedList[item.id] ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                            {item.name}
                          </span>
                        </div>
                        <span className="text-sm font-bold text-slate-400 ml-4 shrink-0">£{item.price.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* --- TAB 4: RECIPES --- */}
        {activeTab === 'recipes' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Recipe 1 */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg">
              <div className="bg-[url('https://images.unsplash.com/photo-1626804475297-41607ea0d4eb?q=80&w=600&auto=format&fit=crop')] bg-cover bg-center h-32 relative">
                <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-[2px]"></div>
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                  <div>
                    <span className="bg-amber-500 text-slate-900 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider mb-2 inline-block">Sun Batch Prep</span>
                    <h3 className="text-xl font-bold text-white leading-tight">Harissa-Braised<br/>Chicken Thigh Wraps</h3>
                  </div>
                  <div className="flex gap-2">
                    <span className="bg-slate-900/80 p-1.5 rounded-lg backdrop-blur-md border border-slate-700 flex items-center gap-1 text-xs text-slate-300"><Clock size={12} /> 45m</span>
                  </div>
                </div>
              </div>
              <div className="p-5 space-y-4 text-sm text-slate-300">
                <div className="flex gap-2 items-start bg-amber-500/10 border border-amber-500/20 p-3 rounded-xl text-amber-200">
                  <ChefHat size={18} className="shrink-0 mt-0.5" />
                  <p><strong>Chef's Tip:</strong> Lightly toast the wrapped burritos seam-down in a dry skillet before packing to seal them shut. No soggy bottoms when reheating!</p>
                </div>
                <ol className="space-y-3 list-decimal list-inside pl-1 marker:text-slate-500 marker:font-bold">
                  <li><strong>Roast Veg:</strong> Toss sliced peppers, courgettes, red onion in oil. Roast at 200°C for 25 mins.</li>
                  <li><strong>Sear Chicken:</strong> Sear 900g thighs in batches until golden brown. Set aside.</li>
                  <li><strong>Braise:</strong> Bloom garlic and harissa in the pan. Add tomatoes & stock {includeSundries ? "(and chopped sun-dried tomatoes!)" : ""}. Return chicken, cover, and simmer low for 20 mins.</li>
                  <li><strong>Assemble:</strong> Shred chicken. Layer spinach, roasted veg, and chicken in wraps. Roll tightly.</li>
                </ol>
              </div>
            </div>

            {/* Recipe 2 */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg">
              <div className="bg-[url('https://images.unsplash.com/photo-1596797038530-2c107229654b?q=80&w=600&auto=format&fit=crop')] bg-cover bg-center h-32 relative">
                <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-[2px]"></div>
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                  <div>
                    <span className="bg-amber-500 text-slate-900 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider mb-2 inline-block">Wed Batch Prep</span>
                    <h3 className="text-xl font-bold text-white leading-tight">Beef, Black Bean &<br/>Chipotle Chili</h3>
                  </div>
                  <div className="flex gap-2">
                    <span className="bg-slate-900/80 p-1.5 rounded-lg backdrop-blur-md border border-slate-700 flex items-center gap-1 text-xs text-slate-300"><Clock size={12} /> 40m</span>
                  </div>
                </div>
              </div>
              <div className="p-5 space-y-4 text-sm text-slate-300">
                <div className="flex gap-2 items-start bg-amber-500/10 border border-amber-500/20 p-3 rounded-xl text-amber-200">
                  <Flame size={18} className="shrink-0 mt-0.5" />
                  <p><strong>Fiber Boost:</strong> Using 5% mince but extending heavily with both Black and Kidney beans maximizes fiber (~16g/serving) while keeping costs low.</p>
                </div>
                <ol className="space-y-3 list-decimal list-inside pl-1 marker:text-slate-500 marker:font-bold">
                  <li><strong>Brown Mince:</strong> Aggressively brown 750g beef mince in a Dutch oven to build fond.</li>
                  <li><strong>Build Base:</strong> Add onions, garlic, chipotle paste/cumin. Cook 2 mins.</li>
                  <li><strong>Simmer:</strong> Pour in chopped tomatoes and all drained beans. Simmer for 30 mins to thicken.</li>
                  <li><strong>Serve:</strong> Portion out with simmered quinoa and cumin-roasted sweet potatoes.</li>
                </ol>
              </div>
            </div>

            {/* Recipe 3 */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg">
               <div className="p-5 border-b border-slate-800 flex justify-between items-center bg-slate-950/50">
                  <div>
                    <span className="bg-slate-700 text-slate-200 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider mb-2 inline-block">Fresh 10-Min Cook</span>
                    <h3 className="text-lg font-bold text-white">Pan-Seared Salmon</h3>
                  </div>
               </div>
              <div className="p-5 space-y-4 text-sm text-slate-300">
                <div className="flex gap-2 items-start bg-amber-500/10 border border-amber-500/20 p-3 rounded-xl text-amber-200">
                  <Utensils size={18} className="shrink-0 mt-0.5" />
                  <p><strong>Chef's Tip:</strong> For crispy skin, pat salmon dry with paper towels. Start skin-side down in a cold pan, bring up to medium heat slowly to render the fat.</p>
                </div>
                <ul className="space-y-2 list-disc list-inside pl-1 marker:text-slate-500">
                  <li>Microwave jacket potato for 6 mins, then crisp in oven/air fryer.</li>
                  <li>Sear salmon skin-side down until crispy, flip for 1 minute.</li>
                  <li>Wilt spinach with garlic in the remaining salmon fat. Finish with lemon juice.</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
```