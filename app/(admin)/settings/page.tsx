"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          System Configuration
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Manage global platform settings
        </p>
      </div>

      {/* Global Settings */}
      <Card className="bg-white dark:bg-[#0F0F12]">
        <CardHeader>
          <CardTitle className="text-lg">Global Settings</CardTitle>
          <CardDescription>
            Configure platform-wide settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="platformName">Platform Name</Label>
              <Input id="platformName" defaultValue="Renance" />
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h4 className="text-sm font-medium">Feature Toggles</h4>

            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-medium">Maintenance Mode</p>
                <p className="text-sm text-gray-500">
                  Enable to put the platform in maintenance mode
                </p>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-medium">New User Registration</p>
                <p className="text-sm text-gray-500">
                  Allow new users to register
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-medium">Trading</p>
                <p className="text-sm text-gray-500">
                  Enable trading functionality
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-medium">Deposits</p>
                <p className="text-sm text-gray-500">
                  Allow users to deposit funds
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-medium">Withdrawals</p>
                <p className="text-sm text-gray-500">
                  Allow users to withdraw funds
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Collateral Settings */}
      <Card className="bg-white dark:bg-[#0F0F12]">
        <CardHeader>
          <CardTitle className="text-lg">Collateral Configuration</CardTitle>
          <CardDescription>
            Configure collateral token settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="collateralToken">Collateral Token</Label>
              <Input id="collateralToken" defaultValue="USDT" disabled />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tokenAddress">Token Contract Address</Label>
              <Input
                id="tokenAddress"
                defaultValue="0x..."
                className="font-mono text-sm"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="minDeposit">Minimum Deposit</Label>
              <Input id="minDeposit" type="number" defaultValue="10" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="minWithdrawal">Minimum Withdrawal</Label>
              <Input id="minWithdrawal" type="number" defaultValue="10" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="withdrawalFee">Withdrawal Fee (USDT)</Label>
              <Input id="withdrawalFee" type="number" defaultValue="0" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button>Save Changes</Button>
      </div>
    </div>
  );
}
