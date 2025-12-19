"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface FiltersProps {
  onFilterChange: (filters: FilterValues) => void;
}

export interface FilterValues {
  search: string;
  category: string;
  fuelType: string;
  location: string;
}

export function Filters({ onFilterChange }: FiltersProps) {
  const [filters, setFilters] = useState<FilterValues>({
    search: "",
    category: "all",
    fuelType: "all",
    location: "all",
  });

  const [activeFiltersCount, setActiveFiltersCount] = useState(0);

  const handleFilterChange = (key: keyof FilterValues, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);

    const count = Object.values(newFilters).filter(
      (v) => v && v !== "all"
    ).length;
    setActiveFiltersCount(count);
  };

  const handleApplyFilters = () => {
    onFilterChange(filters);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      search: "",
      category: "all",
      fuelType: "all",
      location: "all",
    };
    setFilters(clearedFilters);
    setActiveFiltersCount(0);
    onFilterChange(clearedFilters);
  };

  return (
    <div className="bg-white border-2 border-black rounded p-8 shadow-lg">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-black rounded">
            <SlidersHorizontal className="size-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl tracking-tight">FILTER VEHICLES</h3>
            <p className="text-sm text-gray-500 uppercase tracking-widest mt-1">
              Refine your search
            </p>
          </div>
        </div>

        {activeFiltersCount > 0 && (
          <div className="flex items-center gap-3">
            <Badge className="bg-black text-white hover:bg-gray-800 uppercase tracking-widest">
              {activeFiltersCount} Active
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearFilters}
              className="text-gray-500 hover:text-black uppercase tracking-widest text-xs"
            >
              <X className="size-4 mr-1" />
              Clear
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {/* Search */}
        <div className="space-y-3 lg:col-span-1">
          <Label
            htmlFor="search"
            className="text-xs uppercase tracking-widest text-gray-600"
          >
            Search
          </Label>
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-gray-400" />
            <Input
              id="search"
              placeholder="Vehicle name..."
              className="pl-10 border-2 border-gray-200 focus:border-black transition-all duration-300"
              value={filters.search}
              onChange={(e: any) =>
                handleFilterChange("search", e.target.value)
              }
            />
          </div>
        </div>

        {/* Category */}
        <div className="space-y-3">
          <Label
            htmlFor="category"
            className="text-xs uppercase tracking-widest text-gray-600"
          >
            Category
          </Label>
          <Select
            value={filters.category}
            onValueChange={(value: any) =>
              handleFilterChange("category", value)
            }
          >
            <SelectTrigger
              id="category"
              className="border-2 border-gray-200 focus:border-black uppercase text-sm tracking-wider"
            >
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem
                value="all"
                className="uppercase text-sm tracking-wider"
              >
                All Categories
              </SelectItem>
              <SelectItem
                value="luxury"
                className="uppercase text-sm tracking-wider"
              >
                Luxury
              </SelectItem>
              <SelectItem
                value="sports"
                className="uppercase text-sm tracking-wider"
              >
                Sports
              </SelectItem>
              <SelectItem
                value="suv"
                className="uppercase text-sm tracking-wider"
              >
                SUV
              </SelectItem>
              <SelectItem
                value="sedan"
                className="uppercase text-sm tracking-wider"
              >
                Sedan
              </SelectItem>
              <SelectItem
                value="electric"
                className="uppercase text-sm tracking-wider"
              >
                Electric
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Fuel Type */}
        <div className="space-y-3">
          <Label
            htmlFor="fuelType"
            className="text-xs uppercase tracking-widest text-gray-600"
          >
            Fuel Type
          </Label>
          <Select
            value={filters.fuelType}
            onValueChange={(value: any) =>
              handleFilterChange("fuelType", value)
            }
          >
            <SelectTrigger
              id="fuelType"
              className="border-2 border-gray-200 focus:border-black uppercase text-sm tracking-wider"
            >
              <SelectValue placeholder="All Fuel Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem
                value="all"
                className="uppercase text-sm tracking-wider"
              >
                All Types
              </SelectItem>
              <SelectItem
                value="electric"
                className="uppercase text-sm tracking-wider"
              >
                Electric
              </SelectItem>
              <SelectItem
                value="petrol"
                className="uppercase text-sm tracking-wider"
              >
                Petrol
              </SelectItem>
              <SelectItem
                value="diesel"
                className="uppercase text-sm tracking-wider"
              >
                Diesel
              </SelectItem>
              <SelectItem
                value="hybrid"
                className="uppercase text-sm tracking-wider"
              >
                Hybrid
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Location */}
        <div className="space-y-3">
          <Label
            htmlFor="location"
            className="text-xs uppercase tracking-widest text-gray-600"
          >
            Location
          </Label>
          <Select
            value={filters.location}
            onValueChange={(value: any) =>
              handleFilterChange("location", value)
            }
          >
            <SelectTrigger
              id="location"
              className="border-2 border-gray-200 focus:border-black uppercase text-sm tracking-wider"
            >
              <SelectValue placeholder="All Locations" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem
                value="all"
                className="uppercase text-sm tracking-wider"
              >
                All Locations
              </SelectItem>
              <SelectItem
                value="Gulshan"
                className="uppercase text-sm tracking-wider"
              >
                Gulshan
              </SelectItem>
              <SelectItem
                value="Banani"
                className="uppercase text-sm tracking-wider"
              >
                Banani
              </SelectItem>
              <SelectItem
                value="Dhanmondi"
                className="uppercase text-sm tracking-wider"
              >
                Dhanmondi
              </SelectItem>
              <SelectItem
                value="Uttara"
                className="uppercase text-sm tracking-wider"
              >
                Uttara
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Apply Button */}
        <div className="space-y-3">
          <Label className="text-xs invisible">Apply</Label>
          <Button
            className="w-full bg-black hover:bg-gray-800 text-white transition-all duration-300 border-0 h-11 uppercase tracking-widest text-xs"
            onClick={handleApplyFilters}
          >
            <Search className="size-4 mr-2" />
            Apply
          </Button>
        </div>
      </div>
    </div>
  );
}
