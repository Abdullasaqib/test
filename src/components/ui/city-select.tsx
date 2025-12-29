import * as React from "react";
import { Check, ChevronsUpDown, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { getCitiesForCountry, City } from "@/data/cities";

interface CitySelectProps {
  value: string;
  onChange: (value: string) => void;
  countryCode: string;
  placeholder?: string;
  otherValue?: string;
  onOtherChange?: (value: string) => void;
}

export function CitySelect({
  value,
  onChange,
  countryCode,
  placeholder = "Select city",
  otherValue = "",
  onOtherChange,
}: CitySelectProps) {
  const [open, setOpen] = React.useState(false);
  const cities = getCitiesForCountry(countryCode);
  const hasCities = cities.length > 0;
  const isOther = value === "Other";

  // If no cities available for country, show text input directly
  if (!hasCities) {
    return (
      <Input
        value={otherValue}
        onChange={(e) => onOtherChange?.(e.target.value)}
        placeholder="Enter your city"
        className="bg-background"
      />
    );
  }

  return (
    <div className="space-y-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between bg-background"
          >
            <span className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              {value && value !== "Other"
                ? cities.find((city) => city.value === value)?.label || value
                : value === "Other"
                ? "Other (specify below)"
                : placeholder}
            </span>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0 bg-background border shadow-lg z-50" align="start">
          <Command>
            <CommandInput placeholder="Search city..." />
            <CommandList>
              <CommandEmpty>No city found.</CommandEmpty>
              <CommandGroup>
                {cities.map((city) => (
                  <CommandItem
                    key={city.value}
                    value={city.value}
                    onSelect={() => {
                      onChange(city.value);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === city.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {city.label}
                  </CommandItem>
                ))}
                <CommandItem
                  value="Other"
                  onSelect={() => {
                    onChange("Other");
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === "Other" ? "opacity-100" : "opacity-0"
                    )}
                  />
                  Other (not listed)
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {isOther && (
        <Input
          value={otherValue}
          onChange={(e) => onOtherChange?.(e.target.value)}
          placeholder="Enter your city name"
          className="bg-background"
        />
      )}
    </div>
  );
}
