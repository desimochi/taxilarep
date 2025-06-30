import { useEffect, useRef, useState } from "react";

export default function MultiSelectDropdown({ onChange, emails = [] }) {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const containerRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    function handleOutclick(e) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target)
      ) {
        setShowDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleOutclick);
    return () => document.removeEventListener("mousedown", handleOutclick);
  }, []);

  const filteredEmails = emails.filter(
    (user) =>
      user.user.email.toLowerCase().includes(search.toLowerCase()) &&
      !selected.includes(user.user.email)
  );

  const handleSelect = (user) => {
    const email = user.user.email;

    // Prevent duplicate emails
    if (selected.includes(email)) return;

    const updated = [...selected, email];
    setSelected(updated);
    setSearch("");
    setShowDropdown(false);
    if (onChange) onChange(updated); // Notify parent
  };

  const removeSelected = (email) => {
    const updated = selected.filter((x) => x !== email);
    setSelected(updated);
    if (onChange) onChange(updated);
  };

  return (
    <div className="relative w-full max-w-md" ref={containerRef}>
      <div className="flex flex-wrap border p-2 rounded gap-2 min-h-[42px] mb-5">
        {selected.map((email) => (
          <span
            key={email}
            className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm flex items-center gap-1"
          >
            {email}
            <button onClick={() => removeSelected(email)} className="ml-1">
              ×
            </button>
          </span>
        ))}
        <input
          ref={inputRef}
          type="text"
          className="flex-1 border-none focus:outline-none text-sm min-w-[100px]"
          placeholder="Search emails..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setShowDropdown(true);
          }}
          onFocus={() => setShowDropdown(true)}
        />
      </div>

      {showDropdown && filteredEmails.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border mt-1 rounded shadow max-h-40 overflow-y-auto">
          {filteredEmails.map((user) => (
            <li
              key={user.user.id}
              className="px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer text-sm"
              onClick={() => handleSelect(user)}
            >
              {user.user.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
