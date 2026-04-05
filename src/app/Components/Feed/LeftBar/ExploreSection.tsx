import { CiBookmarkMinus } from "react-icons/ci";
import { FiSave } from "react-icons/fi";
import { IoGameControllerOutline, IoSettingsOutline } from "react-icons/io5";
import { LuUserRoundPlus, LuUsers } from "react-icons/lu";
import { MdInsertChartOutlined } from "react-icons/md";
import { PiPlayCircle } from "react-icons/pi";

export default function ExploreSection() {

  const exploreItems = [
    {
      id: "learning",
      Icon: PiPlayCircle,
      new: "yes",
      label: "Learning"
    },
    {
      id: "insights",
      Icon: MdInsertChartOutlined,
      label: "Insights"
    },
    {
      id: "findFriends",
      Icon: LuUserRoundPlus,
      label: "Find Friends"
    },
    {
      id: "bookmarks",
      Icon: CiBookmarkMinus,
      label: "Bookmarks",
    },
    {
      id: "group",
      Icon: LuUsers,
      label: "Group",
    },
    {
      id: "gaming",
      Icon: IoGameControllerOutline,
      new: "yes",
      label: "Gaming",
    },
    {
      id: "settings",
      Icon: IoSettingsOutline,
      label: "Settings",
    },
    {
      id: "savePost",
      Icon: FiSave,
      label: "Save Post",
    },
  ];

  return (
    <div className="bg-white rounded-md p-6">
      <h3 className="text-xl mb-4">Explore</h3>
      <div className="space-y-5">
        {exploreItems.map(({ Icon, label, id, new: isNew }) => (
          <div
            key={id}
            className="group cursor-pointer "
          >
            <div className={`flex items-center justify-between w-full text-muted-foreground`}>
              <p className="flex items-center gap-3 text-base">
                <Icon size={22} />
                <span className="group-hover:text-[#1890FF] transition-colors duration-200">{label}</span>
              </p>
              {
                isNew && <span className="text-[13px] bg-[#0acf83] text-white px-0.5 py-0.5 rounded-sm">New</span>
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
