"use client";

import { useState } from "react";
import {
  ArrowDownUp,
  Building2,
  Calendar,
  Command,
  Download,
  Expand,
  Globe,
  Info,
  Link,
  Search,
  Settings,
  Type,
  Users,
  X,
} from "lucide-react";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { Textarea } from "./components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import { Avatar, AvatarFallback } from "./components/ui/avatar";
import { Button } from "./components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./components/ui/dropdown-menu";
import { Checkbox } from "./components/ui/checkbox";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { type Integration, integrationsData } from "./data";

export const SettingsView = () => {
  const [selectedIntegration, setSelectedIntegration] =
    useState<Integration | null>(null);
  const [integrations, setIntegrations] = useState(integrationsData);

  const handleActionToggle = (actionId: string) => {
    if (!selectedIntegration) return;

    const updatedIntegration = {
      ...selectedIntegration,
      actions: selectedIntegration.actions?.map((action) =>
        action.id === actionId
          ? { ...action, enabled: !action.enabled }
          : action
      ),
    };

    setSelectedIntegration(updatedIntegration);
    setIntegrations((prev) =>
      prev.map((i) => (i.id === updatedIntegration.id ? updatedIntegration : i))
    );
  };

  return (
    <div className="w-full h-full px-3 flex flex-col pt-3 md:pt-0">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-neutral-200">
        <h1 className="text-3xl text-neutral-700 dark:text-neutral-100 tracking-tighter">Settings</h1>
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative w-full md:w-auto">
            <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-neutral-400" />
            <Input
              placeholder="Search"
              className="pl-8 pr-14 h-8 w-full md:w-56 text-sm bg-background border-border placeholder:text-neutral-400"
            />
            <div className="absolute top-1/2 right-2 flex items-center gap-0.5 -translate-y-1/2 text-xs text-neutral-500 bg-muted py-0.5 px-1.5 rounded">
              <Command className="size-3" />
              <span className="font-medium">F</span>
            </div>
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-fit !h-8 text-sm border-border transition-all duration-200 hover:bg-muted hover:scale-[1.02] active:scale-[0.98] group/status">
              <span className="text-neutral-500 transition-colors group-hover/status:text-primary">
                Status:
              </span>
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="px-2.5 py-2 hover:bg-muted dark:hover:bg-neutral-800 rounded-md border border-border h-8 flex items-center gap-1.5 text-sm text-neutral-500 transition-all duration-200 hover:scale-[1.05] active:scale-[0.95] group">
                <ArrowDownUp className="size-3.5 text-neutral-500 transition-colors group-hover:text-primary" />
                Sort
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem className="gap-2">
                <span>Name</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2">
                <span>Date Created</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2">
                <span>Last Modified</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2">
                <span>Status</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Tabs defaultValue="workspace" className="gap-0 mt-5">
        <div className="border-b w-full overflow-x-auto scrollbar-hide">
          <TabsList className="bg-transparent p-0 flex gap-6 m-0 w-max max-md:min-w-full">
            <TabsTrigger
              disabled
              value="general"
              className="rounded-none text-neutral-500 dark:text-neutral-400 data-[state=active]:text-neutral-900 dark:data-[state=active]:text-neutral-100 data-[state=active]:border-b-2 data-[state=active]:border-b-neutral-900 dark:data-[state=active]:border-b-neutral-100 data-[state=active]:shadow-none! p-0 pb-2 font-normal tracking-tight whitespace-nowrap border-t-0 border-x-0 dark:data-[state=active]:bg-transparent"
            >
              General Settings
            </TabsTrigger>
            <TabsTrigger
              value="workspace"
              className="rounded-none text-neutral-500 dark:text-neutral-400 data-[state=active]:text-neutral-900 dark:data-[state=active]:text-neutral-100 data-[state=active]:border-b-[1.5px] data-[state=active]:border-b-neutral-900 dark:data-[state=active]:border-b-neutral-100 data-[state=active]:shadow-none! p-0 pb-2 font-normal tracking-tight whitespace-nowrap border-t-0 border-x-0 dark:data-[state=active]:bg-transparent transition-all duration-200 hover:text-neutral-900 dark:hover:text-neutral-100 hover:scale-[1.02] active:scale-[0.98]"
            >
              Workspace
            </TabsTrigger>
            <TabsTrigger
              disabled
              value="privacy"
              className="rounded-none text-neutral-500 dark:text-neutral-400 data-[state=active]:text-neutral-900 dark:data-[state=active]:text-neutral-100 data-[state=active]:border-b-[1.5px] data-[state=active]:border-b-neutral-900 dark:data-[state=active]:border-b-neutral-100 data-[state=active]:shadow-none! p-0 pb-2 font-normal tracking-tight whitespace-nowrap border-t-0 border-x-0 dark:data-[state=active]:bg-transparent"
            >
              Privacy & Security
            </TabsTrigger>
            <TabsTrigger
              disabled
              value="notifications"
              className="rounded-none text-neutral-500 dark:text-neutral-400 data-[state=active]:text-neutral-900 dark:data-[state=active]:text-neutral-100 data-[state=active]:border-b-[1.5px] data-[state=active]:border-b-neutral-900 dark:data-[state=active]:border-b-neutral-100 data-[state=active]:shadow-none! p-0 pb-2 font-normal tracking-tight whitespace-nowrap border-t-0 border-x-0 dark:data-[state=active]:bg-transparent"
            >
              Notifications
            </TabsTrigger>
            <TabsTrigger
              disabled
              value="team"
              className="rounded-none text-neutral-500 dark:text-neutral-400 data-[state=active]:text-neutral-900 dark:data-[state=active]:text-neutral-100 data-[state=active]:border-b-[1.5px] data-[state=active]:border-b-neutral-900 dark:data-[state=active]:border-b-neutral-100 data-[state=active]:shadow-none! p-0 pb-2 font-normal tracking-tight whitespace-nowrap border-t-0 border-x-0 dark:data-[state=active]:bg-transparent"
            >
              Team members
            </TabsTrigger>
            <TabsTrigger
              disabled
              value="billing"
              className="rounded-none text-neutral-500 dark:text-neutral-400 data-[state=active]:text-neutral-900 dark:data-[state=active]:text-neutral-100 data-[state=active]:border-b-[1.5px] data-[state=active]:border-b-neutral-900 dark:data-[state=active]:border-b-neutral-100 data-[state=active]:shadow-none! p-0 pb-2 font-normal tracking-tight whitespace-nowrap border-t-0 border-x-0 dark:data-[state=active]:bg-transparent"
            >
              Billing
            </TabsTrigger>
            <TabsTrigger
              disabled
              value="integrations"
              className="rounded-none text-neutral-500 dark:text-neutral-400 data-[state=active]:text-neutral-900 dark:data-[state=active]:text-neutral-100 data-[state=active]:border-b-[1.5px] data-[state=active]:border-b-neutral-900 dark:data-[state=active]:border-b-neutral-100 data-[state=active]:shadow-none! p-0 pb-2 font-normal tracking-tight whitespace-nowrap border-t-0 border-x-0 dark:data-[state=active]:bg-transparent"
            >
              Integrations
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="general" className="border-0"></TabsContent>

        <TabsContent value="workspace" className="border-0 overflow-y-auto">
          <div className="py-4 space-y-4">
            {/* Workspace Logo Section */}
            <div className="flex flex-col md:flex-row gap-4 md:gap-8 bg-muted/50 p-3 rounded-md tracking-tight transition-all duration-300 hover:bg-muted/80 group/logo">
              <div className="flex flex-col gap-2">
                <h3 className="text-sm font-medium text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                  <Settings className="size-4 text-neutral-500 transition-colors duration-300 group-hover/logo:text-primary group-hover/logo:rotate-90" />
                  Workspace Logo
                </h3>
                <p className="text-xs text-neutral-500 md:mt-1 md:max-w-48 leading-tight tracking-tight px-0.5">
                  Manage workspace logo and visual identity
                </p>
              </div>
              <div className="bg-background p-2 flex-1 rounded-md transition-all duration-300 group-hover/logo:shadow-sm border border-transparent group-hover/logo:border-border/50">
                <div className="bg-secondary/30 rounded-lg border border-border transition-colors duration-300 group-hover/logo:bg-secondary/40">
                  <div className="flex items-center gap-2 bg-background p-2 rounded-t-lg">
                    <Avatar className="size-11 rounded-full bg-background border border-border transition-transform duration-500 hover:scale-110 cursor-pointer shadow-sm hover:shadow-md">
                      <AvatarFallback className="bg-background rounded-full text-neutral-600 dark:text-neutral-400 border border-border">
                        <Globe className="size-5" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="transition-transform duration-300 group-hover/logo:translate-x-1">
                      <p className="font-medium text-neutral-900 dark:text-neutral-100 text-sm">
                        The Web Dev Company
                      </p>
                      <p className="text-xs text-neutral-500">
                        Professional Plan • Created January 2025
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="m-2 border-border text-neutral-400 font-normal transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] hover:bg-muted group"
                  >
                    <Download className="size-3.5 text-neutral-500 transition-colors group-hover:text-primary" />
                    Upload
                  </Button>
                </div>
              </div>
            </div>

            {/* Workspace Information Section */}
            <div className="flex flex-col md:flex-row gap-4 md:gap-8 bg-muted/50 p-3 rounded-md tracking-tight transition-all duration-300 hover:bg-muted/80 group/info">
              <div className="flex flex-col gap-2">
                <h3 className="text-sm font-medium text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                  <Settings className="size-4 text-neutral-500 transition-colors duration-300 group-hover/info:text-primary group-hover/info:rotate-90" />
                  Workspace Information
                </h3>
                <p className="text-xs text-neutral-500 md:mt-1 md:max-w-48 leading-tight tracking-tight px-0.5">
                  Edit workspace name, URL and description details
                </p>
              </div>
              <div className="bg-background p-2 flex-1 rounded-md flex flex-col gap-4 transition-all duration-300 group-hover/info:shadow-sm border border-transparent group-hover/info:border-border/50">
                <div className="bg-secondary/30 rounded-lg p-2 transition-all duration-200 hover:bg-secondary/50 focus-within:ring-1 focus-within:ring-primary/20 focus-within:bg-secondary/60 group/field">
                  <Label className="text-neutral-700 dark:text-neutral-300 mb-2 transition-colors group-focus-within/field:text-primary">
                    Workspace Name
                  </Label>
                  <div className="relative">
                    <Type className="pointer-events-none absolute top-1/2 left-3 size-3.5 -translate-y-1/2 text-neutral-400 group-hover/field:text-primary group-focus-within/field:text-primary transition-colors" />
                    <Input
                      defaultValue="The Web Dev Company"
                      className="pl-9 bg-background border-border text-neutral-600 dark:text-neutral-400 text-sm transition-all duration-200 focus:scale-[1.01]"
                    />
                  </div>
                </div>
                <div className="bg-secondary/30 rounded-lg p-2 transition-all duration-200 hover:bg-secondary/50 focus-within:ring-1 focus-within:ring-primary/20 focus-within:bg-secondary/60 group/field">
                  <Label className="text-neutral-700 dark:text-neutral-300 mb-2 transition-colors group-focus-within/field:text-primary">Workspace URL</Label>
                  <div className="relative">
                    <Link className="pointer-events-none absolute top-1/2 left-3 size-3.5 -translate-y-1/2 text-neutral-400 group-hover/field:text-primary group-focus-within/field:text-primary transition-colors" />
                    <Input
                      defaultValue="thewebdevcompany"
                      className="pl-9 bg-background border-border text-neutral-600 dark:text-neutral-400 text-sm transition-all duration-200 focus:scale-[1.01]"
                    />
                  </div>
                </div>
                <div className="bg-secondary/30 rounded-lg p-2 transition-all duration-200 hover:bg-secondary/50 focus-within:ring-1 focus-within:ring-primary/20 focus-within:bg-secondary/60 group/field">
                  <Label className="text-neutral-700 dark:text-neutral-300 mb-2 transition-colors group-focus-within/field:text-primary">Industry</Label>
                  <div className="relative">
                    <Building2 className="pointer-events-none absolute top-1/2 left-3 size-3.5 -translate-y-1/2 text-neutral-400 group-hover/field:text-primary group-focus-within/field:text-primary transition-colors" />
                    <Input
                      defaultValue="Technology"
                      className="pl-9 bg-background border-border text-neutral-600 dark:text-neutral-400 text-sm transition-all duration-200 focus:scale-[1.01]"
                    />
                  </div>
                </div>
                <div className="bg-secondary/30 rounded-lg p-2 transition-all duration-200 hover:bg-secondary/50 focus-within:ring-1 focus-within:ring-primary/20 focus-within:bg-secondary/60 group/field">
                  <Label className="text-neutral-700 dark:text-neutral-300 mb-2 transition-colors group-focus-within/field:text-primary">
                    Description{" "}
                    <span className="text-neutral-400">(Optional)</span>
                  </Label>
                  <Textarea
                    defaultValue="We are a modern web development agency specializing in building scalable SaaS products, custom dashboards, and enterprise solutions. Our team collaborates daily using TaskFlow to manage projects, track progress, and deliver high-quality work on time"
                    className="bg-background border-border min-h-[100px] resize-none text-neutral-600 dark:text-neutral-400 text-sm transition-all duration-200 focus:scale-[1.01]"
                  />
                </div>
              </div>
            </div>

            {/* Workspace Preferences Section */}
            <div className="flex flex-col md:flex-row gap-4 md:gap-8 bg-muted/50 p-3 rounded-md tracking-tight transition-all duration-300 hover:bg-muted/80 group/prefs">
              <div className="flex flex-col gap-2">
                <h3 className="text-sm font-medium text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                  <Settings className="size-4 text-neutral-500 transition-colors duration-300 group-hover/prefs:text-primary group-hover/prefs:rotate-90" />
                  Workspace Preferences
                </h3>
                <p className="text-xs text-neutral-500 md:mt-1 md:max-w-48 leading-tight tracking-tight px-0.5">
                  Configure default settings and access controls
                </p>
              </div>
              <div className="bg-background p-2 flex-1 rounded-md flex flex-col gap-4 transition-all duration-300 group-hover/prefs:shadow-sm border border-transparent group-hover/prefs:border-border/50">
                <div className="bg-secondary/30 rounded-lg p-2 transition-all duration-200 hover:bg-secondary/50 focus-within:ring-1 focus-within:ring-primary/20 focus-within:bg-secondary/60 group/field">
                  <Label className="text-neutral-700 dark:text-neutral-300 mb-2 transition-colors group-focus-within/field:text-primary">
                    Week Starts On
                  </Label>
                  <div className="relative">
                    <Calendar className="pointer-events-none absolute top-1/2 left-3 size-3.5 -translate-y-1/2 text-neutral-400 z-10 group-hover/field:text-primary group-focus-within/field:text-primary transition-colors" />
                    <Select defaultValue="monday">
                      <SelectTrigger className="pl-9 bg-background border-border w-full text-neutral-600 dark:text-neutral-400 transition-all duration-200 hover:bg-muted active:scale-[0.98]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sunday">Sunday</SelectItem>
                        <SelectItem value="monday">Monday</SelectItem>
                        <SelectItem value="saturday">Saturday</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="bg-secondary/30 rounded-lg p-2 transition-all duration-200 hover:bg-secondary/50 focus-within:ring-1 focus-within:ring-primary/20 focus-within:bg-secondary/60 group/field">
                  <Label className="text-neutral-700 dark:text-neutral-300 mb-2 transition-colors group-focus-within/field:text-primary">
                    Language<span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-sm z-10 transition-transform duration-200 group-hover/field:scale-110">
                      🇺🇸
                    </span>
                    <Select defaultValue="en-us">
                      <SelectTrigger className="pl-9 bg-background border-border w-full text-neutral-600 dark:text-neutral-400 transition-all duration-200 hover:bg-muted active:scale-[0.98]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en-us">English (US)</SelectItem>
                        <SelectItem value="en-gb">English (UK)</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="bg-secondary/30 rounded-lg p-2 transition-all duration-200 hover:bg-secondary/50 focus-within:ring-1 focus-within:ring-primary/20 focus-within:bg-secondary/60 group/field">
                  <Label className="text-neutral-700 dark:text-neutral-300 mb-2 transition-colors group-focus-within/field:text-primary">Time Zone</Label>
                  <div className="relative">
                    <Globe className="pointer-events-none absolute top-1/2 left-3 size-3.5 -translate-y-1/2 text-neutral-400 z-10 group-hover/field:text-primary group-focus-within/field:text-primary transition-colors" />
                    <Select defaultValue="pst">
                      <SelectTrigger className="pl-9 bg-background border-border w-full text-neutral-600 dark:text-neutral-400 transition-all duration-200 hover:bg-muted active:scale-[0.98]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pst">
                          UTC-08:00 Pacific Time (US & Canada)
                        </SelectItem>
                        <SelectItem value="mst">
                          UTC-07:00 Mountain Time (US & Canada)
                        </SelectItem>
                        <SelectItem value="cst">
                          UTC-06:00 Central Time (US & Canada)
                        </SelectItem>
                        <SelectItem value="est">
                          UTC-05:00 Eastern Time (US & Canada)
                        </SelectItem>
                        <SelectItem value="utc">UTC+00:00 UTC</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="bg-secondary/30 rounded-lg p-2 transition-all duration-200 hover:bg-secondary/50 focus-within:ring-1 focus-within:ring-primary/20 focus-within:bg-secondary/60 group/field">
                  <Label className="text-neutral-700 dark:text-neutral-300 mb-2 transition-colors group-focus-within/field:text-primary">
                    Allow Members to Create Projects
                  </Label>
                  <div className="relative">
                    <Users className="pointer-events-none absolute top-1/2 left-3 size-3.5 -translate-y-1/2 text-neutral-400 z-10 group-hover/field:text-primary group-focus-within/field:text-primary transition-colors" />
                    <Select defaultValue="disabled">
                      <SelectTrigger className="pl-9 bg-background border-border w-full text-neutral-600 dark:text-neutral-400 transition-all duration-200 hover:bg-muted active:scale-[0.98]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="enabled">Enabled</SelectItem>
                        <SelectItem value="disabled">
                          If disabled, only admins can create new projects
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="privacy" className="border-0"></TabsContent>
        <TabsContent value="notifications" className="border-0"></TabsContent>
        <TabsContent value="team" className="border-0"></TabsContent>
        <TabsContent value="billing" className="border-0"></TabsContent>

        <TabsContent value="integrations" className="border-0">
          <div className="py-4">
            {/* Section Header */}
            <div className="flex items-center gap-2 mb-4">
              <Info className="size-4 text-neutral-500" />
              <h3 className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                Available Integrations
              </h3>
            </div>

            {/* Integrations Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {integrations.map((integration) => (
                <div
                  key={integration.id}
                  className="bg-card border border-border rounded-lg flex flex-col justify-between min-h-[160px] relative transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] hover:shadow-lg hover:-translate-y-1 group/card"
                >
                  {/* Connected Badge */}
                  {integration.connected && (
                    <div className="absolute top-3 right-3 flex items-center gap-1.5 text-xs text-neutral-500 border border-border rounded-full px-2 py-1 bg-secondary/50">
                      <span className="size-1.5 bg-green-500 rounded-full" />
                      Connected
                    </div>
                  )}

                  {/* Icon & Name */}
                  <div className="p-3">
                    <div className="size-10 bg-neutral-900 rounded-lg flex items-center justify-center mb-3">
                      <integration.icon className="size-5 text-white" />
                    </div>
                    <h4 className="font-medium text-neutral-900 dark:text-neutral-100 text-sm">
                      {integration.name}
                    </h4>
                    <p className="text-xs text-neutral-500 mt-1 leading-snug ">
                      {integration.description}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-4 flex gap-2 justify-between bg-muted/50 p-2 rounded-b-lg">
                    {integration.connected ? (
                      <>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-500 hover:text-red-600 border flex-1/2 hover:bg-red-50 font-normal px-3"
                        >
                          Disconnect
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-border font-normal px-3 flex-1/2 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] hover:bg-accent"
                          onClick={() => setSelectedIntegration(integration)}
                        >
                          Manage {integration.name}
                        </Button>
                      </>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full border-border font-normal transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] hover:bg-primary hover:text-primary-foreground"
                      >
                        Connect
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Manage Integration Dialog */}
          <Dialog
            open={!!selectedIntegration}
            onOpenChange={(open) => !open && setSelectedIntegration(null)}
          >
            <DialogContent
              className="sm:max-w-[520px] p-0 gap-0"
              showCloseButton={false}
            >
              <DialogHeader className="px-4 py-2 flex flex-row items-center justify-between border-b border-border">
                <DialogTitle className="text-base font-medium flex items-center gap-0">
                  Manage Integration
                </DialogTitle>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" className="size-8 transition-transform duration-200 hover:scale-110 active:scale-90">
                    <Expand className="size-4 text-neutral-500" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-8 transition-transform duration-200 hover:scale-110 active:scale-90 hover:bg-red-50 hover:text-red-500 group"
                    onClick={() => setSelectedIntegration(null)}
                  >
                    <X className="size-4 text-neutral-500 group-hover:text-red-500" />
                  </Button>
                </div>
              </DialogHeader>

              {selectedIntegration && (
                <div className="p-4">
                  {/* Integration Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="size-10 bg-neutral-900 rounded-lg flex items-center justify-center">
                      <selectedIntegration.icon className="size-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-medium text-neutral-900 dark:text-neutral-100 text-sm">
                        {selectedIntegration.name} Integration
                      </h3>
                      <p className="text-xs text-neutral-500 tracking-tight">
                        Last synced {selectedIntegration.lastSynced} •{" "}
                        {selectedIntegration.linkedItems}
                      </p>
                    </div>
                  </div>

                  {/* Default Board Select */}
                  <div className="bg-background flex-1 rounded-md flex flex-col gap-4">
                    <div className="bg-secondary/30 rounded-lg p-2">
                      <Label className="text-neutral-900 dark:text-neutral-100 font-medium mb-2">
                        Default {selectedIntegration.name} Board
                      </Label>
                      <Select defaultValue={selectedIntegration.defaultBoard}>
                        <SelectTrigger className="w-full bg-background border-border">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem
                            value={
                              selectedIntegration.defaultBoard || "default"
                            }
                          >
                            {selectedIntegration.defaultBoard}
                          </SelectItem>
                          <SelectItem value="marketing">
                            Marketing Campaign
                          </SelectItem>
                          <SelectItem value="design">Design System</SelectItem>
                          <SelectItem value="backend">
                            Backend Development
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Sync Direction */}
                    <div className="bg-secondary/30 rounded-lg p-2">
                      <Label className="text-neutral-900 dark:text-neutral-100 font-medium mb-2">
                        Sync Direction
                      </Label>
                      <Select defaultValue={selectedIntegration.syncDirection}>
                        <SelectTrigger className="w-full bg-background border-border">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Two-way Sync">
                            Two-way Sync
                          </SelectItem>
                          <SelectItem value="One-way Sync">
                            One-way Sync
                          </SelectItem>
                          <SelectItem value="Manual">Manual Only</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Automatic Actions */}
                    {selectedIntegration.actions &&
                      selectedIntegration.actions.length > 0 && (
                        <div className="bg-secondary/30 rounded-lg p-2">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="size-1.5 bg-neutral-400 rounded-full" />
                            <Label className="text-neutral-900 dark:text-neutral-100 font-medium">
                              Automatic Actions
                            </Label>
                          </div>
                          <div className="space-y-0 border bg-background border-border rounded-lg overflow-hidden">
                            {selectedIntegration.actions.map(
                              (action, index) => (
                                <div
                                  key={action.id}
                                  className={`flex items-center justify-between p-3 ${index !==
                                    selectedIntegration.actions!.length - 1
                                    ? "border-b border-neutral-200"
                                    : ""
                                    }`}
                                >
                                  <span className="text-xs text-neutral-700">
                                    {action.label}
                                  </span>
                                  <Checkbox
                                    checked={action.enabled}
                                    onCheckedChange={() =>
                                      handleActionToggle(action.id)
                                    }
                                    className="data-[state=checked]:bg-primary dark:data-[state=checked]:bg-neutral-100 dark:data-[state=checked]:border-neutral-100"
                                  />
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      )}
                  </div>

                  {/* Footer Actions */}
                  <div className="mt-6 space-y-3">
                    <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]">
                      Save Changes
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full border text-red-500 hover:text-red-600 hover:bg-red-50 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                    >
                      Disconnect
                    </Button>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </TabsContent>
      </Tabs>
    </div>
  );
};
