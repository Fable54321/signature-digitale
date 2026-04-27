import { useState } from "react";
import { rules } from "../../Utils/Rules";

type ChecklistKey = keyof typeof rules;
type ChecklistState = Record<ChecklistKey, boolean>;

const ChecklistBox = () => {

 
    const [checklist, setChecklist] = useState<ChecklistState>({
      "isAuthorizedArea": false,
      "isRestrictedArea": false,
      "isWashingHands": false,
      "isNoManipulation": false,
      "isAppropriateWear": false,
      "isCleanShoes": false,
      "isOther": false,
      "isApproved": false,
    });



  return (
    <section className="border-2 ">
      <form action="">
        {(Object.entries(checklist) as Array<[ChecklistKey, boolean]>).map(([key, value]) => (
          <div key={key} className="flex items-center">
            <input
              type="checkbox"
              checked={value}
              onChange={(e) => {
                setChecklist((prev) => ({
                  ...prev,
                  [key]: e.target.checked,
                }));
              }}
            />
            <label>{rules[key]}</label>
          </div>
        ))}

      </form>
    </section>
  )
}

export default ChecklistBox



