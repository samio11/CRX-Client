"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  createCar,
  getAllCar,
  deleteCar,
  updateCarStatus,
} from "@/services/cars";
import { Plus, Trash2, ToggleLeft, ToggleRight } from "lucide-react";
import AvatarUpload from "@/components/avatar-upload";
import { ScrollArea } from "@/components/ui/scroll-area";

// Zod schema without pricePerDay
const carSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  brand: z.string().min(1, "Brand is required"),
  model: z.string().min(1, "Model is required"),
  year: z
    .number()
    .min(1886)
    .max(new Date().getFullYear() + 1),
  color: z.string().min(1, "Color is required"),
  category: z.enum(["sedan", "suv", "sports", "luxury", "van", "hatchback"]),
  fuelType: z.enum(["petrol", "diesel", "electric", "hybrid"]),
  seats: z.number().min(1).max(50),
  features: z.string(),
  mileage: z.number().min(0),
  location: z.string().min(1, "Location is required"),
});

type CarFormValues = z.infer<typeof carSchema>;

interface Car {
  _id: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  color: string;
  pricePerDay: number;
  category: string;
  fuelType: string;
  seats: number;
  features: string[];
  image: string;
  mileage: number;
  isAvailable: boolean;
  location: string;
  isDeleted: boolean;
}

export default function ManageCar() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const form = useForm<CarFormValues>({
    resolver: zodResolver(carSchema),
    defaultValues: {
      name: "",
      brand: "",
      model: "",
      year: new Date().getFullYear(),
      color: "",
      category: "sedan",
      fuelType: "petrol",
      seats: 5,
      features: "",
      mileage: 0,
      location: "",
    },
  });

  // Price mapping based on backend logic
  const getPriceByCategory = (category: string) => {
    switch (category) {
      case "sedan":
        return 500;
      case "suv":
        return 300;
      case "hatchback":
        return 700;
      case "luxury":
        return 2000;
      case "sports":
        return 3000;
      case "van":
        return 400;
      default:
        return 0;
    }
  };

  // Fetch all cars
  const fetchCars = async () => {
    try {
      setLoading(true);
      const result = await getAllCar();
      if (result.success) {
        setCars(result.data.result);
      } else {
        toast.error("Failed to load cars");
      }
    } catch (err) {
      toast.error("Something went wrong while fetching cars");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  // Create car
  const onSubmit = async (values: CarFormValues) => {
    if (!imageFile) {
      toast.error("Please upload a car image");
      return;
    }

    const formData = new FormData();
    const dataObj = {
      ...values,
      features: values.features
        .split(",")
        .map((f) => f.trim())
        .filter((f) => f),
      isAvailable: true,
      isDeleted: false,
      // pricePerDay is NOT included — backend calculates it
    };

    formData.append("data", JSON.stringify(dataObj));
    formData.append("file", imageFile);

    const toastId = toast.loading("Adding new car...");

    try {
      const result = await createCar(formData);
      if (result?.success || result?.message?.includes("success")) {
        toast.success("Car added successfully", { id: toastId });
        setIsDialogOpen(false);
        form.reset();
        setImageFile(null);
        fetchCars();
      } else {
        toast.error(result?.message || "Failed to add car", { id: toastId });
      }
    } catch (err: any) {
      toast.error(err?.message || "Failed to add car", { id: toastId });
    }
  };

  // Delete car
  const handleDelete = async (carId: string) => {
    if (!confirm("Are you sure you want to delete this car?")) return;

    const toastId = toast.loading("Deleting car...");
    try {
      const result = await deleteCar(carId);
      if (result?.success) {
        toast.success("Car deleted successfully", { id: toastId });
        fetchCars();
      } else {
        toast.error("Failed to delete car", { id: toastId });
      }
    } catch (err) {
      toast.error("Error deleting car", { id: toastId });
    }
  };

  // Toggle availability
  const handleToggleAvailability = async (carId: string, current: boolean) => {
    const toastId = toast.loading("Updating status...");
    try {
      const result = await updateCarStatus(carId, !current);
      if (result?.success) {
        toast.success("Status updated", { id: toastId });
        fetchCars();
      } else {
        toast.error("Failed to update status", { id: toastId });
      }
    } catch (err) {
      toast.error("Error updating status", { id: toastId });
    }
  };

  const currentCategory = form.watch("category");

  return (
    <div className="container mx-auto py-8 px-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-3xl font-bold">Manage Cars</CardTitle>
            <CardDescription>
              Add, view, and manage your rental car inventory
            </CardDescription>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="gap-2">
                <Plus className="w-5 h-5" />
                Add New Car
              </Button>
            </DialogTrigger>

            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Car</DialogTitle>
                <DialogDescription>
                  Fill in the details to add a new car to your fleet
                </DialogDescription>
              </DialogHeader>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Car Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Tesla Model 3" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="brand"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Brand</FormLabel>
                          <FormControl>
                            <Input placeholder="Tesla" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="model"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Model</FormLabel>
                          <FormControl>
                            <Input placeholder="Model 3" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="year"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Year</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              {...field}
                              onChange={(e) =>
                                field.onChange(parseInt(e.target.value))
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="color"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Color</FormLabel>
                          <FormControl>
                            <Input placeholder="White" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="sedan">Sedan</SelectItem>
                              <SelectItem value="suv">SUV</SelectItem>
                              <SelectItem value="sports">Sports</SelectItem>
                              <SelectItem value="luxury">Luxury</SelectItem>
                              <SelectItem value="van">Van</SelectItem>
                              <SelectItem value="hatchback">
                                Hatchback
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="fuelType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Fuel Type</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select fuel type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="petrol">Petrol</SelectItem>
                              <SelectItem value="diesel">Diesel</SelectItem>
                              <SelectItem value="electric">Electric</SelectItem>
                              <SelectItem value="hybrid">Hybrid</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="seats"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Seats</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              {...field}
                              onChange={(e) =>
                                field.onChange(parseInt(e.target.value))
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Location</FormLabel>
                          <FormControl>
                            <Input placeholder="Gulshan, Dhaka" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="mileage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mileage (km/L)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              {...field}
                              onChange={(e) =>
                                field.onChange(parseInt(e.target.value))
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Price Preview */}
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <Label>Price Per Day (Auto-calculated)</Label>
                    <p className="text-2xl font-bold text-primary mt-2">
                      ৳{getPriceByCategory(currentCategory).toLocaleString()}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Price is automatically set based on selected category
                    </p>
                  </div>

                  <FormField
                    control={form.control}
                    name="features"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Features (comma separated)</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Autopilot, Touch Display, Fast Charging"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div>
                    <Label>Car Image</Label>
                    <AvatarUpload onFileChange={setImageFile} />
                  </div>

                  <div className="flex justify-end gap-3 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">Add Car</Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </CardHeader>

        <CardContent>
          {loading ? (
            <div className="text-center py-12">Loading cars...</div>
          ) : cars.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              No cars found. Add your first car!
            </div>
          ) : (
            <ScrollArea className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Brand & Model</TableHead>
                    <TableHead>Price/Day</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cars.map((car) => (
                    <TableRow key={car._id}>
                      <TableCell>
                        <img
                          src={car.image}
                          alt={car.name}
                          className="w-16 h-16 object-cover rounded-md"
                        />
                      </TableCell>
                      <TableCell className="font-medium">{car.name}</TableCell>
                      <TableCell>
                        {car.brand} {car.model} ({car.year})
                      </TableCell>
                      <TableCell>
                        ৳{(car.pricePerDay ?? 0).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="capitalize">
                          {car.category}
                        </Badge>
                      </TableCell>
                      <TableCell>{car.location}</TableCell>
                      <TableCell>
                        <Badge
                          variant={car.isAvailable ? "default" : "destructive"}
                        >
                          {car.isAvailable ? "Available" : "Booked"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() =>
                              handleToggleAvailability(car._id, car.isAvailable)
                            }
                          >
                            {car.isAvailable ? (
                              <ToggleRight className="w-4 h-4" />
                            ) : (
                              <ToggleLeft className="w-4 h-4" />
                            )}
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-destructive hover:text-destructive"
                            onClick={() => handleDelete(car._id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
