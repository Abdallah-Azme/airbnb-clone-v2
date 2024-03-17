"use client";

import { CountrySelectValue } from "@/data";
import useCountries from "@/hooks/useCountry";
import Select from "react-select";

type CountrySelectProps = {
  value?: CountrySelectValue;
  onChange: (value: CountrySelectValue) => void;
};

export default function CountrySelect({ onChange, value }: CountrySelectProps) {
  const { getAll } = useCountries();
  return (
    <div>
      <Select
        placeholder="Anywhere"
        isClearable
        options={getAll()}
        value={value}
        onChange={(value) => onChange(value as CountrySelectValue)}
        formatOptionLabel={(option: any) => (
          <div className="flex flex-row items-center gap-3 ">
            <div className="">{option.flag}</div>
            <div className="">
              {option.label},{" "}
              <span className=" text-neutral-500 ml-1 "> {option.region}</span>
            </div>
          </div>
        )}
        classNames={{
          control: () => "p-3 border-2 ",
          input: () => " text-lg ",
          option: () => " text-lg ",
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: "black",
            primary25: "#ffe4e6",
          },
        })}
      />
    </div>
  );
}
