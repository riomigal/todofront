import Spinner from "../form/fields/Spinner";
import { getCategories, getPriorities } from "../services/Requests";
import { useEffect, useState } from "react";
import Select from "../form/fields/Select";
import TextInput from "../form/fields/TextInput";
import Button from "../form/fields/Button";

export default function TaskFilter(props) {
  let [priorities, setPriorities] = useState(null);
  let [categories, setCategories] = useState(null);
  let [selectedPriorityId, setSelectedPriorityId] = useState("");
  let [selectedCategoryId, setSelectedCategoryId] = useState("");
  let [search, setSearch] = useState("");
  let [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function getPriorityOptions() {
      const response = await getPriorities();
      setPriorities(response.data.data);
    }
    getPriorityOptions();

    async function getCategoryOptions() {
      const response = await getCategories();
      setCategories(response.data.data);
    }
    getCategoryOptions();
  }, []);

  const updateFilter = async (e) => {
    setIsSubmitting(true);
    e.preventDefault();
    let formdata = [];
    new FormData(e.target).forEach((value, key) => {
      formdata[key] = value;
    });
    setSelectedPriorityId(formdata.priority_id);
    setSelectedCategoryId(formdata.categories);
    setSearch(formdata.search);
    props.onFilterChange(
      "?filter[category]=" +
        formdata.categories +
        "&filter[search]=" +
        formdata.search +
        "&filter[priority_id]=" +
        formdata.priority_id +
        "&filter[completed]=" +
        formdata.completed
    );
    setIsSubmitting(false);
  };

  return (
    <>
      <div className="m-auto max-w-4xl">
        {priorities !== Object && categories !== Object ? (
          <form
            className="flex flex-wrap gap-4"
            onSubmit={updateFilter}
            action="GET"
          >
            <TextInput
              id="search"
              type="text"
              placeholder="Search..."
              value={search}
            />
            <Select
              id="priority_id"
              options={priorities}
              optionText="All Priority"
              selectedId={selectedPriorityId}
            />

            <Select
              id="categories"
              options={categories}
              optionText="All Categories/Labels"
              selectedId={selectedCategoryId}
            />

            <Select
              id="completed"
              options={[
                { id: 0, name: "Show pending" },
                { id: 1, name: "Show completed" },
              ]}
              optionText="All statuses"
            />
            <Button text="Filter" isSubmitting={isSubmitting} />
          </form>
        ) : (
          <Spinner />
        )}
      </div>
    </>
  );
}
