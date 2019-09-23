import React from "react";

export default function Filter({ forms, formFilter, setFormFilter }) {
  function changeFilter(e) {
    setFormFilter(e.currentTarget.value);
  }

  function filterOptions() {
    return forms
      .sort((a, b) => {
        const aName = a.name.toUpperCase();
        const bName = b.name.toUpperCase();

        if (aName > bName) return 1;
        if (aName < bName) return -1;
        return 0;
      })
      .map(form => {
        return (
          <option key={form.id} value={form.id}>
            {form.name}
          </option>
        );
      });
  }

  return (
    <div className="relative tc mb3">
      <select
        className="inline-block input-reset near-black bg-white b--moon-gray f6 pa2 w-90"
        value={formFilter}
        onChange={changeFilter}>
        <option value="">Filter by form</option>
        {filterOptions()}
      </select>
      <div
        className="absolute flex items-center"
        style={{ pointerEvents: "none", top: "0.6rem", right: "1.5rem" }}>
        <svg className="w1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
    </div>
  );
}
