import { BadRequestException, Body, Controller, Post } from "@nestjs/common";
import { Public } from "@/decorator/public/public.decorator";
import type { SubscriptionCreatedWebhook, UserCreatedWebhook } from "./dto/webhook.schema";
import { WebhookService } from "./webhook.service";

@Controller("webhook")
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}
  @Public()
  @Post("/user-created")
  async createUserWebhook(@Body() userCreatedWebhook: UserCreatedWebhook) {
    try {
      await this.webhookService.createUserWebhook(userCreatedWebhook);

      return {
        message: "event triggered successfully",
        status: 200,
      };
    } catch (error) {
      throw new BadRequestException("Failed to create user webhook");
    }
  }

  @Public()
  @Post("/lemonsqueezy")
  async createSubscriptionWebhook(@Body() subscriptionCreatedWebhook: SubscriptionCreatedWebhook) {
    try {
      await this.webhookService.createSubscriptionWebhook(subscriptionCreatedWebhook);
    } catch (error) {
      throw new BadRequestException("Failed to create subscription webhook");
    }
  }
}
